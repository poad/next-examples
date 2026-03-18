#!/usr/bin/env node
import { BackendStack } from '../lib/backend-stack.js';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const parameterName = app.node.tryGetContext('parameterName');
const clientId = app.node.tryGetContext('clientId');
const clientSecret = app.node.tryGetContext('clientSecret');

const appName = 'next-github-auth-ssg-example';

new BackendStack(app, `${appName}-backend-stack`, {
  appName,
  parameterName,
  githubOauth: {
    clientId,
    clientSecret,
  },
});
