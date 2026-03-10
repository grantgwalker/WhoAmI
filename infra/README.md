# Infra (AWS CDK)

This folder hosts the AWS CDK app for deploying the **static frontend**:
- Frontend: S3 + CloudFront (serves `../frontend/out`)

The backend (Django) is now considered legacy and is not deployed.

## Prereqs
- AWS CLI configured (`aws configure`)
- CDK bootstrap once per account/region: `npm run cdk:bootstrap`

## Commands (PowerShell)

From `infra/`:
- Install deps: `npm install`
- Build frontend locally: `npm run build:frontend` (runs the Next.js export in `../frontend`)
- Deploy frontend: `npm run deploy:frontend`

Once deployed, the CloudFront domain output by the stack is your public site URL.
