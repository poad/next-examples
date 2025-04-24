#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NextCloudFrontTemplateStack } from '../lib/cloudfront-s3-cdn-stack';
import { nextJsExport } from '../lib/process/setup';

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
