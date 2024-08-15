import 'dotenv/config'

import process from 'node:process';

export enum Environment {
  Dev = 'development',
  Prod = 'production',
}

export class Config {
  constructor (private readonly env: NodeJS.ProcessEnv) {};

  getEnv (): Environment {
    return this.env['NODE_ENV'] === Environment.Prod ? Environment.Prod : Environment.Dev;
  }

  isDevelopment (): boolean {
    return this.getEnv() === Environment.Dev;
  }

  isProduction (): boolean {
    return this.getEnv() === Environment.Prod;
  }

  getDbUrl (): string {
    return this.env['DB_URL'] ?? '';
  }

  getPort (): string {
    return this.env['APP_PORT'] ?? '';
  }
}

export const config = new Config(process.env);
