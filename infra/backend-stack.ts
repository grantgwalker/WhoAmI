import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as apprunner from 'aws-cdk-lib/aws-apprunner';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface BackendStackProps extends cdk.StackProps {
  serviceName?: string;
  allowedHosts?: string[];
  cloudfrontOrigin?: string;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps = {}) {
    super(scope, id, props);

    const serviceName = props.serviceName ?? 'whoami-backend';

    // Reference an existing ECR repo (must be created and image pushed manually)
    // const repo = ecr.Repository.fromRepositoryName(this, 'BackendRepo', serviceName);

    const ecrAccessRole = new iam.Role(this, 'AppRunnerEcrAccessRole', {
      assumedBy: new iam.ServicePrincipal('apprunner.amazonaws.com'),
      description: 'Role that App Runner uses to pull images from ECR',
    });
    ecrAccessRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'));

    ecrAccessRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['iam:PassRole'],
        resources: [ecrAccessRole.roleArn],
        conditions: {
          StringEquals: {
            'iam:PassedToService': 'apprunner.amazonaws.com',
          },
        },
      }),
    );

    // 1. Create the App Runner Service Role (Instance Role)
    const appRunnerInstanceRole = new iam.Role(this, 'AppRunnerInstanceRole', {
        assumedBy: new iam.ServicePrincipal('tasks.apprunner.amazonaws.com'),
        description: 'Role for the App Runner service instance to assume for runtime tasks',
    });
    // This role needs minimal permissions, but often requires the following for basic logging/health checks
    appRunnerInstanceRole.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSAppRunnerServicePolicyForECR'),
    );

    const service = new apprunner.CfnService(this, 'BackendAppRunnerService', {
      serviceName,
      sourceConfiguration: {
        authenticationConfiguration: {
          accessRoleArn: ecrAccessRole.roleArn,
        },
        imageRepository: {
          imageRepositoryType: 'ECR',
          imageIdentifier: `${cdk.Stack.of(this).account}.dkr.ecr.${cdk.Stack.of(this).region}.amazonaws.com/${serviceName}:latest`,
          imageConfiguration: {
            port: '8000',
            runtimeEnvironmentVariables: [
              { name: 'DJANGO_SETTINGS_MODULE', value: 'config.settings' },
              { name: 'DEBUG', value: 'False' },
              { name: 'ALLOWED_HOSTS', value: (props.allowedHosts ?? ['*']).join(',') },
              ...(props.cloudfrontOrigin ? [{ name: 'CLOUDFRONT_ORIGIN', value: props.cloudfrontOrigin }] : []),
            ],
          },
        },
        autoDeploymentsEnabled: true,
      },
      instanceConfiguration: {
            instanceRoleArn: appRunnerInstanceRole.roleArn,
        },
      healthCheckConfiguration: {
        healthyThreshold: 1,
        interval: 10,
        path: '/api/health/',
        protocol: 'HTTP',
        timeout: 5,
        unhealthyThreshold: 5,
      },
    });

    new cdk.CfnOutput(this, 'BackendRepositoryUri', {
      value: `${cdk.Stack.of(this).account}.dkr.ecr.${cdk.Stack.of(this).region}.amazonaws.com/${serviceName}`,
    });

    new cdk.CfnOutput(this, 'AppRunnerServiceName', {
      value: service.serviceName ?? '',
    });

    new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
      value: service.attrServiceUrl,
    });
  }
}

const app = new cdk.App();
new BackendStack(app, 'WhoAmI-BackendStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});