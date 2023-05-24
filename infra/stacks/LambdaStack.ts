import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { Function as LambdaFunction, Runtime, Code, Architecture } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Architecture } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class LambdaStack extends Stack {
    public readonly exploreLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const exploreLambda = new NodejsFunction(this, 'ExploreLambda', {
            architecture: Architecture.ARM_64,
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: join(__dirname, '../../index.js')
        });

        exploreLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                'ssm:GetParameter'
            ],
            resources: ['arn:aws:ssm:us-east-1:615473889574:parameter/mongoDbPassword']
        }));

        this.exploreLambdaIntegration = new LambdaIntegration(exploreLambda);

        // new LambdaFunction(this, 'ExploreLambda', {
        //     architecture: Architecture.ARM_64,
        //     runtime: Runtime.NODEJS_18_X,
        //     handler: 'hello.main',
        //     code: Code.fromAsset(join(__dirname, '../src'))
        // });
    }
}
