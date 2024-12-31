import { type Static, Type } from '@sinclair/typebox';
import { TransformDecodeCheckError, Value } from '@sinclair/typebox/value';
import config from 'config';

import { ConfigurationError } from './common/errors/configurationError.js';
import { LogLevel } from './common/logger/logLevel.js';

const configSchema = Type.Object({
  hashSaltRounds: Type.Number({
    minimum: 5,
    maximum: 15,
  }),
  logLevel: Type.Enum(LogLevel),
  mongo: Type.Object({
    uri: Type.String({ minLength: 1 }),
  }),
  server: Type.Object({
    host: Type.String({ minLength: 1 }),
    port: Type.Number({
      minimum: 1,
      maximum: 65535,
    }),
  }),
  token: Type.Object({
    secret: Type.String({ minLength: 1 }),
  }),
});

export type Config = Static<typeof configSchema>;

export function createConfig(): Config {
  try {
    return Value.Decode(configSchema, config);
  } catch (error) {
    if (error instanceof TransformDecodeCheckError) {
      throw new ConfigurationError({ ...error.error });
    }

    throw error;
  }
}
