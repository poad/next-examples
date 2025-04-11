#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
const stackName =
	app.node.tryGetContext('stack_name') || 'next-ts-amplify-hosting-stack';
const appName = app.node.tryGetContext('app_name') || 'AmplifyApp';
new CdkStack(app, stackName, {
  appName,
});
