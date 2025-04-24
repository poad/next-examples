import { setupWorker } from 'msw/browser';
import { handlers } from './resolver';

export const worker = setupWorker(...handlers);
