"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendStack = void 0;
const cdk = require("aws-cdk-lib");
const apprunner = require("aws-cdk-lib/aws-apprunner");
const iam = require("aws-cdk-lib/aws-iam");
class BackendStack extends cdk.Stack {
    constructor(scope, id, props = {}) {
        var _a, _b, _c;
        super(scope, id, props);
        const serviceName = (_a = props.serviceName) !== null && _a !== void 0 ? _a : 'whoami-backend';
        // Reference an existing ECR repo (must be created and image pushed manually)
        // const repo = ecr.Repository.fromRepositoryName(this, 'BackendRepo', serviceName);
        const ecrAccessRole = new iam.Role(this, 'AppRunnerEcrAccessRole', {
            assumedBy: new iam.ServicePrincipal('apprunner.amazonaws.com'),
            description: 'Role that App Runner uses to pull images from ECR',
        });
        ecrAccessRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'));
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
                            { name: 'ALLOWED_HOSTS', value: ((_b = props.allowedHosts) !== null && _b !== void 0 ? _b : ['*']).join(',') },
                            ...(props.cloudfrontOrigin ? [{ name: 'CLOUDFRONT_ORIGIN', value: props.cloudfrontOrigin }] : []),
                        ],
                    },
                },
                autoDeploymentsEnabled: true,
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
            value: (_c = service.serviceName) !== null && _c !== void 0 ? _c : '',
        });
        new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
            value: service.attrServiceUrl,
        });
    }
}
exports.BackendStack = BackendStack;
const app = new cdk.App();
new BackendStack(app, 'WhoAmI-BackendStack-v2', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
