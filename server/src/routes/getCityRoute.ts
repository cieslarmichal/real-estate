/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { cityModel } from '../models/cityModel.js';

const pathParamsSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
});

type PathParams = Static<typeof pathParamsSchema>;

export function getCityRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/cities/:id',
    {
      schema: {
        params: pathParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Params: PathParams }>, reply) => {
      const city = await cityModel.findById(request.params.id);

      if (!city) {
        throw new ResourceNotFoundError({
          resource: 'City',
          name: request.params.id,
        });
      }

      return reply.send(city);
    },
  );
}
