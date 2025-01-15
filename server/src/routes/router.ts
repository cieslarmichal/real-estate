import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { getCitiesRoute } from './getCitiesRoute.js';
import { getCityRoute } from './getCityRoute.js';
import { getListingRoute } from './getListingRoute.js';
import { getListingsRoute } from './getListingsRoute.js';
import { getUserRoute } from './getUserRoute.js';

export function registerRoutes(fastify: FastifyInstance): void {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fastify.get('/health', async (_request: FastifyRequest, reply) => {
    return reply.send({ healthy: true });
  });

  fastify.register(getListingsRoute);

  fastify.register(getListingRoute);

  fastify.register(getUserRoute);

  fastify.register(getCitiesRoute);

  fastify.register(getCityRoute);
}
