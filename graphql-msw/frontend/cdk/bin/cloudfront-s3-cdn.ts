#!/usr/bin/env node
import { NextCloudFrontTemplateStack } from '../lib/cloudfront-s3-cdn-stack.js';
import { nextJsExport } from '../lib/process/setup.js';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const env = app.node.tryGetContext('env');
const name = app.node.tryGetContext('appName');
if (!name) {
  throw new Error('appName be not null');
}
const appName = `${env ? `${env}-` : ''}${name}`;

const apiUrl = app.node.tryGetContext('apiUrl');
if (!apiUrl) {
  throw new Error('apiUrl be not null');
}

nextJsExport({
  apiUrl,
});

new NextCloudFrontTemplateStack(app, `${appName}-stack`, {
  appName,
});
