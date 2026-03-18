#!/usr/bin/env node
import { NextCloudFrontTemplateStack } from '../lib/cloudfront-s3-cdn-stack.js';
import { nextJsExport } from '../lib/process/setup.js';
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const env = app.node.tryGetContext('env');
const appName =
  app.node.tryGetContext('appkName') ||
	`${env ? `${env}-` : ''}next-cloudfront-template`;
const clientId = app.node.tryGetContext('clientId');
const apiUrl = app.node.tryGetContext('apiUrl');

nextJsExport({
  clientId,
  apiUrl,
});

new NextCloudFrontTemplateStack(app, `${appName}-stack`, {
  appName,
});
