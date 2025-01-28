import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { createCityRoute } from './createCityRoute.js';
import { getCitiesRoute } from './getCitiesRoute.js';
import { getCityRoute } from './getCityRoute.js';
import { getListingRoute } from './getListingRoute.js';
import { getListingsRoute } from './getListingsRoute.js';
import { getUserRoute } from './getUserRoute.js';
import { loginUserRoute } from './loginUserRoute.js';
import { logoutUserRoute } from './logoutUserRoute.js';
import { registerUserRoute } from './registerUserRoute.js';
import { type AuthService } from '../common/auth/authService.js';
import { type Config } from '../config.js';
import { createListingRoute } from './createListingRoute.js';
import { getUsersRoute } from './getUsersRoute.js';

export function registerRoutes(fastify: FastifyInstance, config: Config, authService: AuthService): void {
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

  createListingRoute(fastify, authService);

  createCityRoute(fastify, authService);

  fastify.register(getUsersRoute);
}
