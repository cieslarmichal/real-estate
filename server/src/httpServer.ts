/* eslint-disable @typescript-eslint/naming-convention */

import { fastifyCors } from '@fastify/cors';
import { fastifyHelmet } from '@fastify/helmet';
import { fastifyMultipart } from '@fastify/multipart';
import { fastifyStatic } from '@fastify/static';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { fastify, type FastifyInstance } from 'fastify';
import { type FastifySchemaValidationError } from 'fastify/types/schema.js';
import path from 'node:path';

import { AuthService } from './common/auth/authService.js';
import { ForbiddenAccessError } from './common/errors/forbiddenAccessError.js';
import { InputNotValidError } from './common/errors/inputNotValidError.js';
import { OperationNotValidError } from './common/errors/operationNotValidError.js';
import { ResourceAlreadyExistsError } from './common/errors/resourceAlreadyExistsError.js';
import { ResourceNotFoundError } from './common/errors/resourceNotFoundError.js';
import { serializeError } from './common/errors/serializeError.js';
import { UnauthorizedAccessError } from './common/errors/unathorizedAccessError.js';
import { type LoggerService } from './common/logger/loggerService.js';
import { HttpStatusCode } from './common/types/httpStatusCode.js';
import { type Config } from './config.js';
import { registerRoutes } from './routes/router.js';

export class HttpServer {
  private readonly fastifyServer: FastifyInstance;

  public constructor(
    private readonly loggerService: LoggerService,
    private readonly config: Config,
  ) {
    this.fastifyServer = fastify({ bodyLimit: 10 * 1024 * 1024 }).withTypeProvider<TypeBoxTypeProvider>();
  }

  public async start(): Promise<void> {
    const { host, port } = this.config.server;

    this.setupErrorHandler();

    await this.fastifyServer.register(fastifyMultipart, {
      limits: {
        fileSize: 1024 * 1024 * 1024 * 4,
      },
    });

    await this.fastifyServer.register(fastifyHelmet);

    await this.fastifyServer.register(fastifyCors, {
      origin: '*',
      methods: '*',
      allowedHeaders: '*',
    });

    await this.fastifyServer.register(fastifyStatic, {
      root: path.join(path.resolve(), 'public'),
      prefix: '/public',
    });

    this.fastifyServer.addHook('onRequest', (request, _reply, done) => {
      this.loggerService.info({
        message: 'HTTP request received.',
        endpoint: `${request.method} ${request.url}`,
      });

      done();
    });

    this.fastifyServer.addHook('onSend', (request, reply, _payload, done) => {
      this.loggerService.info({
        message: 'HTTP response sent.',
        endpoint: `${request.method} ${request.url}`,
        statusCode: reply.statusCode,
      });

      if (request.url.includes('/public')) {
        reply.header('cross-origin-resource-policy', 'cross-origin');
      }

      done();
    });

    this.fastifyServer.setSerializerCompiler(() => {
      return (data): string => JSON.stringify(data);
    });

    const authService = new AuthService(this.config);

    registerRoutes(this.fastifyServer, this.config, authService);

    await this.fastifyServer.listen({
      port,
      host,
    });

    this.loggerService.info({
      message: 'HTTP Server started.',
      port,
      host,
    });
  }

  public async stop(): Promise<void> {
    await this.fastifyServer.close();

    this.loggerService.info({
      message: 'HTTP Server stopped.',
    });
  }

  private setupErrorHandler(): void {
    this.fastifyServer.setSchemaErrorFormatter((errors, dataVar) => {
      const { instancePath, message } = errors[0] as FastifySchemaValidationError;

      return new InputNotValidError({
        reason: `${dataVar}${instancePath} ${message}`,
        value: undefined,
      });
    });

    this.fastifyServer.setErrorHandler((error, request, reply) => {
      const serializedError = serializeError(error);

      this.loggerService.error({
        message: 'Caught an error in HTTP server.',
        endpoint: `${request.method} ${request.url}`,
        error: serializedError,
      });

      const responseError = {
        ...serializedError,
        stack: undefined,
        cause: undefined,
        context: {
          ...(serializedError['context'] ? (serializedError['context'] as Record<string, unknown>) : {}),
          originalError: undefined,
        },
      };

      if (error instanceof InputNotValidError) {
        return reply.status(HttpStatusCode.badRequest).send(responseError);
      }

      if (error instanceof ResourceNotFoundError) {
        return reply.status(HttpStatusCode.notFound).send(responseError);
      }

      if (error instanceof OperationNotValidError) {
        return reply.status(HttpStatusCode.badRequest).send(responseError);
      }

      if (error instanceof ResourceAlreadyExistsError) {
        return reply.status(HttpStatusCode.conflict).send(responseError);
      }

      if (error instanceof UnauthorizedAccessError) {
        return reply.status(HttpStatusCode.unauthorized).send(responseError);
      }

      if (error instanceof ForbiddenAccessError) {
        return reply.status(HttpStatusCode.forbidden).send(responseError);
      }

      return reply.status(HttpStatusCode.internalServerError).send({
        name: 'InternalServerError',
        message: 'Internal server error',
      });
    });
  }
}
