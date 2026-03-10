# Deployment Status — WhoAmI (Static Frontend)

This README summarizes the current deployment setup for the **static frontend only**. The Django backend is now considered legacy and is not part of the live architecture.

## Frontend (Next.js static export)
- Static export configured in `frontend/next.config.ts` (`output: 'export', images.unoptimized: true`).
- AWS CDK stack created in `infra/stack.ts`:
  - S3 bucket for static site
  - CloudFront distribution (HTTPS, SPA-friendly error handling)
  - S3 deploy from the `out/` folder and cache invalidation
- CDK helper files:
  - `infra/cdk.json`
  - `infra/package.json` scripts:
    - `npm run build:frontend` — builds `../frontend/out`
    - `npm run deploy:frontend` — deploys the CDK stack
    - `npm run cdk:bootstrap` — prepares AWS account
- Deployment confirmed: frontend CDK stack has been successfully deployed.

## Backend (Django) — Legacy / Not Deployed
- The `backend/` Django project and its Docker configuration were originally created to serve a JSON API.
- The architecture has since been simplified to a **static-only frontend**, so:
  - No ECR/App Runner backend is required.
  - No backend image builds, pushes, or env configuration are needed for production.
- You can safely ignore or remove the backend deployment instructions if you do not plan to use a dynamic API.

## Quick Commands Reference (PowerShell)
```powershell
# Frontend: build and deploy via CDK
cd infra
npm install
npm run cdk:bootstrap   # one-time per account/region
npm run build:frontend  # builds ../frontend/out
npm run deploy:frontend # deploys S3 + CloudFront
```

---

If you later decide to reintroduce a backend, you can reuse the `backend/` folder as a starting point and add a dedicated infra stack for it.