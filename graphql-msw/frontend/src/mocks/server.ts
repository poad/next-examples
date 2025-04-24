import { setupServer } from 'msw/node';
import { handlers } from './resolver';

export const server = setupServer(...handlers);
