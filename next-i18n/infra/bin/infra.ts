#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import assert from 'assert';
import { InfraStack, InfraStackProps } from '../lib/infra-stack.js';
import { nextJsExport } from '../lib/process/setup.js';

const app = new cdk.App();

nextJsExport();

const env = app.node.tryGetContext('env') as string;

assert(env !== undefined, 'env context must not be undefined');

const config = app.node.tryGetContext(env) as InfraStackProps;

const stackName = `${config.appName}-stack`;

const stack = new InfraStack(app, stackName, {
  ...config,
});

Tags.of(stack).add('cloudformation-stack-name', stackName);
