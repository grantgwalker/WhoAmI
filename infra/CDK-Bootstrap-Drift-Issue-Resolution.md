# AWS CDK Bootstrap Role Visibility Issue - Root Cause & Resolution

## Issue Summary

**Problem:** CDK bootstrap appeared to succeed, but expected IAM roles (e.g., `cdk-hnb659fds-cfn-exec-role-*`) were not visible in the AWS IAM console, preventing successful CDK deployments.

**Impact:** Backend stack deployment via CDK failed due to missing IAM roles that CDK needs for CloudFormation operations.

**Root Cause:** CloudFormation stack drift - roles were manually deleted from IAM outside of CloudFormation, creating inconsistency between CloudFormation's view of resources and actual AWS state.

---

## Technical Background

### CDK Bootstrap Process
CDK bootstrap creates a `CDKToolkit` CloudFormation stack that includes:
- **IAM Roles:** CloudFormation execution, file publishing, image publishing, deployment action, and lookup roles
- **S3 Bucket:** For storing CDK assets
- **ECR Repository:** For container assets
- **SSM Parameter:** Bootstrap version tracking

### The Drift Problem
1. Initial CDK bootstrap created roles successfully
2. User manually deleted all IAM roles for a "clean slate"
3. CloudFormation stack still showed `CREATE_COMPLETE` status for roles
4. But IAM service no longer had the actual role resources
5. This created **stack drift** - CloudFormation thought resources existed, but they didn't

---

## Root Cause Analysis

### Symptoms Observed
- `npx cdk bootstrap` reported success: "✅ Environment aws://975050056035/us-east-1 bootstrapped"
- CloudFormation showed CDKToolkit stack with `CREATE_COMPLETE` status
- `aws cloudformation describe-stack-resources` listed IAM roles with `CREATE_COMPLETE` status
- But `aws iam get-role` returned "NoSuchEntity" errors
- IAM console showed only service-linked roles, no CDK roles

### Why This Happened
1. **Manual Deletion:** User deleted IAM roles directly via IAM console or CLI
2. **CloudFormation Drift:** CloudFormation wasn't aware of the manual deletions
3. **Inconsistent State:** CloudFormation believed roles existed, but IAM service didn't have them
4. **Bootstrap Failure:** Subsequent bootstrap attempts failed due to resource existence validation

### Validation Commands Used
```bash
# CloudFormation thought roles existed
aws cloudformation describe-stack-resources --stack-name CDKToolkit

# But IAM said they didn't
aws iam get-role --role-name cdk-hnb659fds-cfn-exec-role-975050056035-us-east-1
# Error: NoSuchEntity

# Bootstrap appeared successful but was actually "no changes"
npx cdk bootstrap aws://975050056035/us-east-1
# Output: "✅ Environment aws://975050056035/us-east-1 bootstrapped (no changes)."
```

---

## Resolution Steps

### Step 1: Identify the Issue
- Confirmed CDKToolkit stack existed in CloudFormation
- Verified roles were listed as CREATE_COMPLETE in stack resources
- Discovered IAM API calls failed with NoSuchEntity errors
- Diagnosed as CloudFormation stack drift

### Step 2: Clean Up Orphaned Resources
**Delete CDKToolkit Stack:**
```bash
aws cloudformation delete-stack --stack-name CDKToolkit --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name CDKToolkit --region us-east-1
```

**Remove Orphaned S3 Bucket:**
```bash
# Delete all object versions
aws s3api delete-objects --bucket cdk-hnb659fds-assets-975050056035-us-east-1 \
  --delete "$(aws s3api list-object-versions --bucket cdk-hnb659fds-assets-975050056035-us-east-1 \
  --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"

# Delete delete markers
aws s3api delete-objects --bucket cdk-hnb659fds-assets-975050056035-us-east-1 \
  --delete "$(aws s3api list-object-versions --bucket cdk-hnb659fds-assets-975050056035-us-east-1 \
  --query '{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}')"

# Remove bucket
aws s3 rb s3://cdk-hnb659fds-assets-975050056035-us-east-1 --region us-east-1
```

**Check and Remove Orphaned ECR Repository:**
```bash
# Check if exists and delete if found
aws ecr describe-repositories --repository-names cdk-hnb659fds-container-assets-975050056035-us-east-1 2>/dev/null \
  && aws ecr delete-repository --repository-name cdk-hnb659fds-container-assets-975050056035-us-east-1 --force
```

### Step 3: Cancel Stuck Changesets
```bash
aws cloudformation delete-change-set --change-set-name cdk-deploy-change-set \
  --stack-name CDKToolkit --region us-east-1
```

### Step 4: Fresh Bootstrap
```bash
npx cdk bootstrap aws://975050056035/us-east-1
```

### Step 5: Verification
```bash
# Verify roles exist in IAM
aws iam get-role --role-name cdk-hnb659fds-cfn-exec-role-975050056035-us-east-1

# Check CloudFormation stack status
aws cloudformation describe-stacks --stack-name CDKToolkit --query "Stacks[0].StackStatus"

# Verify all expected roles are present
aws iam list-roles --query "Roles[?contains(RoleName, 'cdk-hnb659fds')].RoleName"
```

---

## Results

### Before Fix
- CDK bootstrap: ✅ Success (but "no changes")
- IAM roles: ❌ Not found
- CDK deploy: ❌ Failed (missing roles)

### After Fix
- CDK bootstrap: ✅ Success (created resources)
- IAM roles: ✅ All present in console
- CDK deploy: ✅ Ready to proceed

---

## Lessons Learned

### 1. CloudFormation Stack Drift
- **Issue:** Manual resource deletion outside CloudFormation creates drift
- **Impact:** CloudFormation loses track of actual resource state
- **Prevention:** Always use CloudFormation/CDK for resource management

### 2. CDK Bootstrap State
- **Issue:** Bootstrap can report success even when no changes are made
- **Impact:** Misleading success messages hide underlying problems
- **Prevention:** Always verify resource creation with direct AWS API calls

### 3. IAM Role Dependencies
- **Issue:** CDK deployments require specific IAM roles to exist
- **Impact:** Missing roles cause deployment failures
- **Prevention:** Never manually delete CDK-managed IAM roles

---

## Prevention Measures

### For Future CDK Projects
1. **Never manually delete CDK-managed resources** - always use `cdk destroy`
2. **Check IAM console after bootstrap** to verify roles exist
3. **Use `aws iam list-roles` with CDK prefix** to verify role creation
4. **Monitor CloudFormation stack drift** regularly

### Best Practices
```bash
# After bootstrap, verify roles exist
aws iam list-roles --query "Roles[?contains(RoleName, 'cdk-')].RoleName"

# Check for stack drift
aws cloudformation detect-stack-drift --stack-name CDKToolkit

# Use CDK destroy instead of manual deletion
cdk destroy
```

### Monitoring Commands
```bash
# Check CDK toolkit stack health
aws cloudformation describe-stacks --stack-name CDKToolkit --query "Stacks[0].{Status:StackStatus,Drift:DriftInformation.StackDriftStatus}"

# List all CDK-related roles
aws iam list-roles --query "Roles[?contains(RoleName, 'cdk')].[RoleName,CreateDate]" --output table
```

---

## Technical Details

### CDK Bootstrap Resources Created
- **IAM Roles (5):**
  - `cdk-hnb659fds-cfn-exec-role-*` - CloudFormation execution
  - `cdk-hnb659fds-deploy-role-*` - Deployment actions
  - `cdk-hnb659fds-file-publishing-role-*` - S3 file publishing
  - `cdk-hnb659fds-image-publishing-role-*` - ECR image publishing
  - `cdk-hnb659fds-lookup-role-*` - Cross-account lookups

- **S3 Bucket:** `cdk-hnb659fds-assets-*` - Asset storage
- **ECR Repository:** `cdk-hnb659fds-container-assets-*` - Container assets
- **SSM Parameter:** `/cdk-bootstrap/hnb659fds/version` - Version tracking

### Role Permissions
Each role has specific permissions:
- **CloudFormation Execution Role:** Full CloudFormation access
- **Deployment Role:** IAM, Lambda, and other service permissions
- **Publishing Roles:** S3 and ECR access respectively
- **Lookup Role:** Read-only cross-account access

---

## Conclusion

The issue was resolved by identifying and fixing CloudFormation stack drift caused by manual IAM role deletion. The fix involved completely removing the drifted CDKToolkit stack and all its orphaned resources, then performing a fresh bootstrap.

**Key Takeaway:** CDK bootstrap success messages don't guarantee resource creation - always verify with direct AWS API calls, especially after manual resource modifications.

This resolution enables successful CDK deployments and establishes proper AWS infrastructure management practices for the project.