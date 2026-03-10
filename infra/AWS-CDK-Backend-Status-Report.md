# WhoAmI AWS CDK Backend Deployment Status Report

## Project Overview

- **Goal:** Deploy Django backend (App Runner) and Next.js frontend (S3/CloudFront) using AWS CDK v2, with secure AWS authentication and infrastructure-as-code.
- **Current Focus:** Backend deployment pipeline (ECR → App Runner) via CDK, with manual ECR image management.

---

## Technical Stack

- **Frontend:** Next.js, React, Tailwind, Framer Motion, Lenis
- **Backend:** Django, DRF, Gunicorn, Docker
- **Infra:** AWS CDK v2, S3, CloudFront, ECR, App Runner, IAM roles
- **Credentials:** AWS CLI v2, IAM user (AdministratorAccess), `aws login` (short-lived credentials), CloudShell (suggested)

---

## Current State

### 1. ECR Repository & Image
- ECR repo (`whoami-backend`) exists
- Docker image (`latest` tag) is present and pushed successfully

### 2. CDK Bootstrap
- `npx cdk bootstrap aws://975050056035/us-east-1` ran successfully
- **Problem:** Expected CDK roles (e.g., `cdk-hnb659fds-...`) are NOT visible in IAM console. Only service-linked roles appear
- Tried with root, IAM user, and `aws login` credentials; same result

### 3. Backend Stack Deployment
- CDK stack (`WhoAmI-BackendStack`) references existing ECR repo and image
- App Runner service creation fails due to missing IAM roles (or related permissions)
- Used `--no-rollback` to retain failed resources for debugging

### 4. Credentials & Permissions
- IAM user has AdministratorAccess
- Verified identity with `aws sts get-caller-identity`
- No long-lived access keys preferred; using `aws login` and CloudShell

---

## Troubleshooting History
- Deleted all IAM roles for a clean slate
- Rebootstrapped CDK; roles still not created
- Advised to use CloudShell and `aws login` for secure credentials
- Confirmed ECR repo and image are present
- App Runner fails to stabilize, likely due to missing CDK bootstrap roles

---

## Outstanding Issues
1. **CDK Bootstrap Roles Missing:** CDK bootstrap does not create required IAM roles, blocking App Runner deployment
2. **App Runner Service Fails:** Service cannot access ECR image or lacks permissions due to missing roles
3. **Authentication Method:** Need to ensure CDK deploy uses secure, recommended AWS authentication (not long-lived keys)

---

## Next Steps
- Diagnose why CDK bootstrap is not creating roles (try CloudShell, verify permissions, check bootstrap logs)
- Ensure IAM user/session has full admin rights and no policy restrictions
- Once roles are present, deploy backend stack via CDK
- Set frontend API URL and verify endpoints

---

## Reference Commands
- Build/push Docker image:
  - `docker build -t whoami-backend:latest .`
  - `docker push 975050056035.dkr.ecr.us-east-1.amazonaws.com/whoami-backend:latest`
- CDK bootstrap:
  - `npx cdk bootstrap aws://975050056035/us-east-1`
- Deploy backend stack:
  - `npx cdk deploy --app "npx ts-node backend-stack.ts" WhoAmI-BackendStack --no-rollback`

---

## Key Files
- `infra/ECR-Deploy-Destroy.md`: Step-by-step ECR/App Runner/CDK guide
- `infra/backend-stack.ts`: CDK stack for backend (references ECR, creates App Runner service)

---

## Handoff Summary
- **Main blocker:** CDK bootstrap roles missing, preventing App Runner deployment
- **Immediate need:** Investigate and resolve CDK/IAM role creation so backend stack can deploy
- **All other infra and image prerequisites are met**
