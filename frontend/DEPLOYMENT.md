# AWS CDK Deployment Guide

This guide will help you deploy your portfolio website to AWS using CDK.

## Prerequisites

1. **AWS Account**: Make sure you have an AWS account
2. **AWS CLI**: Install and configure AWS CLI
   ```bash
   aws configure
   ```
3. **CDK Bootstrap**: Run this once to prepare your AWS account
   ```bash
   npm run cdk:bootstrap
   ```

## Deployment Steps

### 1. Build your site
```bash
npm run build
```
This creates a static export in the `out/` folder.

### 2. Deploy to AWS
```bash
npm run deploy
```
Or manually:
```bash
npm run build && npx cdk deploy --app "npx ts-node infra/stack.ts"
```

### 3. Get your website URL
After deployment, CDK will output a CloudFront URL (e.g., `d12345.cloudfront.net`).

## Architecture

- **S3 Bucket**: Stores your static files
- **CloudFront**: Global CDN for fast delivery
- **HTTPS**: Automatic SSL certificate
- **SPA Support**: Handles React routing correctly

## Updating Your Site

Whenever you make changes:

```bash
npm run build
npm run deploy
```

CDK will detect changes and only update what's necessary.

## Cost

For a personal portfolio with low traffic: **$0.00/month**

- S3: Free tier covers small sites
- CloudFront: Free tier + minimal data transfer costs

## Troubleshooting

- **Build fails**: Make sure `next.config.ts` has `output: 'export'`
- **CDK deploy fails**: Check AWS credentials with `aws configure`
- **404 errors**: CloudFront is configured to serve `index.html` for all routes

## Cleanup

To remove everything:
```bash
npx cdk destroy --app "npx ts-node infra/stack.ts"
```