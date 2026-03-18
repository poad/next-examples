#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack.js';

const app = new cdk.App();
const name = app.node.tryGetContext('name');

new InfraStack(app, `${name}-infra-stack`, {
  name,
  region: app.node.tryGetContext('region'),
});
