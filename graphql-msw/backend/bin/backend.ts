#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

const env = app.node.tryGetContext('env');
const name = app.node.tryGetContext('appName');
if (!name) {
  throw new Error('appName be not null');
}
const appName = `${env ? `${env}-` : ''}${name}`;

const parameterName = app.node.tryGetContext('parameterName');
if (!parameterName) {
  throw new Error('parameterName be not null');
}
const bucketName = app.node.tryGetContext('s3bucketName');
if (!bucketName) {
  throw new Error('bucketName be not null');
}

new BackendStack(app, `${appName}-backend-stack`, {
  appName,
  parameterName,
  bucketName,
});
