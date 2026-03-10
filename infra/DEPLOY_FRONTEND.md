# Deploying the Frontend Stack with AWS CDK

This guide explains how to deploy your static frontend (Next.js/React) to AWS using the CDK stack defined in `infra/stack.ts`.

## Prerequisites

- AWS CLI configured with credentials (`aws configure`)
- Node.js and npm installed
- AWS CDK installed globally (`npm install -g aws-cdk`)
- All dependencies installed in the `infra` folder (`npm install`)
- Frontend build output available at `frontend/out` (run `npm run build` in the frontend folder)

## Steps

### 1. Build the Frontend

Navigate to your frontend directory and build the static site:

```sh
cd ../frontend
npm install
npm run build
```

This will generate the static files in `frontend/out`.

### 2. Install Infra Dependencies

Go to the `infra` directory and install dependencies:

```sh
cd ../infra
npm install
```

### 3. Bootstrap CDK (First Time Only)

If this is your first time deploying CDK resources in your AWS account/region, run:

```sh
cdk bootstrap
```

### 4. Deploy the Stack

Run the following command in the `infra` directory:

```sh
npx cdk deploy
```

This will:
- Create an S3 bucket for your site
- Set up a CloudFront distribution
- Upload the static frontend files
- Output the CloudFront URL for your deployed site

### 5. Access Your Site

After deployment, look for the `WebsiteURL` output in your terminal. Visit this URL in your browser to view your deployed frontend.

## Troubleshooting

- Ensure your AWS credentials are valid and have permissions for S3 and CloudFront.
- If you change the stack code, re-run `npx cdk deploy`.
- If you update the frontend, rebuild (`npm run build`) and redeploy (`npx cdk deploy`).

## Clean Up

To remove all resources (S3 bucket, CloudFront, etc.):

```sh
npx cdk destroy
```

---

**Note:** The stack automatically deletes the S3 bucket and its contents when destroyed.
