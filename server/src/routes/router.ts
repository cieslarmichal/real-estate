import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { getCitiesRoute } from './getCitiesRoute.js';
import { getCityRoute } from './getCityRoute.js';
import { getListingRoute } from './getListingRoute.js';
import { getListingsRoute } from './getListingsRoute.js';
import { getUserRoute } from './getUserRoute.js';
import { loginUserRoute } from './loginUserRoute.js';
import { logoutUserRoute } from './logoutUserRoute.js';
import { registerUserRoute } from './registerUserRoute.js';
import { type Config } from '../config.js';

export function registerRoutes(fastify: FastifyInstance, config: Config): void {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fastify.get('/health', async (_request: FastifyRequest, reply) => {
    return reply.send({ healthy: true });
  });

  fastify.register(getListingsRoute);

  fastify.register(getListingRoute);

  fastify.register(getUserRoute);

  fastify.register(getCitiesRoute);

  fastify.register(getCityRoute);

  loginUserRoute(fastify, config);

  registerUserRoute(fastify, config);

  fastify.register(logoutUserRoute);
}
