import { App } from 'aws-cdk-lib';
import { LambdaStack } from './stacks/LambdaStack';
import { ApiStack } from './stacks/ApiStack';

const app = new App();
const lambdaStack = new LambdaStack(app, 'ExploreLambdaStack');
new ApiStack(app, 'ExploreApiStack', {
    exploreLambdaIntegration: lambdaStack.exploreLambdaIntegration
});
