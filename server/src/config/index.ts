import { EnvironmentConstants } from '../types';

const config: EnvironmentConstants = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.ENV ?? 'development',
  disableAuthentication: true,
};

export default config;
