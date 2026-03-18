#!/usr/bin/env node
import { InfraStack } from '../lib/infra-stack.js';
import { nextJsExport } from '../lib/process/setup.js';
import * as cdk from 'aws-cdk-lib';

nextJsExport();

const app = new cdk.App();
new InfraStack(app, 'NextCloudwatchRumExample', {
  name: 'next-html-import-example',
  region: 'us-west-2',
});
