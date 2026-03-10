# App Runner ECR Access Issue - Comprehensive Troubleshooting Guide

## Current State

- **Project:** Deploy Django backend to AWS App Runner using CDK, with container image stored in ECR (`whoami-backend:latest`).
- **Infrastructure:**
  - ECR repository and image exist and are correctly tagged.
  - IAM role (`WhoAmI-BackendStack-AppRunnerEcrAccessRole23CA5BBD-LfhJgpzL15rZ`) is created by CDK and referenced by App Runner.
  - Trust relationship for the role is correct (`apprunner.amazonaws.com`).
  - `AmazonEC2ContainerRegistryReadOnly` policy is attached to the role.
  - CDK stack deploys without IAM errors.
- **App Runner Service:**
  - Source: `975050056035.dkr.ecr.us-east-1.amazonaws.com/whoami-backend:latest`
  - ECR access role ARN matches the IAM role created by CDK.

## The Issue

- **Error:**
  - App Runner fails to pull the image from ECR.
  - Console log: `Failed to pull your application image. Reason: Invalid Access Role in AuthenticationConfiguration.`
- **What this means:**
  - App Runner cannot use the IAM role to access ECR, even though the role and policy appear correct.

## What Has Been Verified

1. **ECR image exists and is tagged as `latest`.**
2. **IAM role ARN in App Runner matches the role created by CDK.**
3. **Trust relationship is correct:**
   ```json
   {
     "Effect": "Allow",
     "Principal": { "Service": "apprunner.amazonaws.com" },
     "Action": "sts:AssumeRole"
   }
   ```
4. **Policy attached:** `AmazonEC2ContainerRegistryReadOnly`.
5. **No manual changes to the role after CDK deployment.**

## Suspected Causes

- **Resource drift or stale App Runner service:**
  - Previous failed deployments or manual changes may have left orphaned resources.
- **Propagation delay:**
  - Sometimes IAM changes take a few minutes to propagate.
- **Hidden configuration issue:**
  - Rarely, AWS may have a hidden misconfiguration or a bug.

## Next Steps (Recommended Fix)

1. **Delete the App Runner service:**
   - AWS Console → App Runner → Services → Delete `whoami-backend`.
2. **Delete the CloudFormation stack:**
   - AWS Console → CloudFormation → Stacks → Delete `WhoAmI-BackendStack`.
3. **Delete any leftover IAM roles named `WhoAmI-BackendStack-AppRunnerEcrAccessRole...`.**
   - AWS Console → IAM → Roles → Delete any matching roles.
4. **Redeploy with CDK:**
   - In your project directory:
     ```powershell
     npx cdk deploy --app "npx ts-node backend-stack.ts" WhoAmI-BackendStack --no-rollback
     ```
5. **Double-check App Runner logs after deployment.**

## Additional Checks

- **ECR image:**
  - AWS Console → ECR → whoami-backend → Images (should show `latest` tag).
- **IAM role:**
  - AWS Console → IAM → Roles → Confirm trust and policy.
- **App Runner configuration:**
  - AWS Console → App Runner → Services → whoami-backend → Configuration → Source → ECR access role (should match IAM role ARN).

## Summary

- All configuration appears correct, but App Runner cannot use the IAM role to access ECR.
- The most likely cause is a stale or orphaned resource, or a propagation delay.
- A full reset (delete and redeploy all related resources) is recommended to restore CDK automation and resolve the error.

---

**If the error persists after a full reset, contact AWS Support with the details above.**
