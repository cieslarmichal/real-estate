/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { userModel } from '../models/userModel.js';

const pathParamsSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
});

type PathParams = Static<typeof pathParamsSchema>;

export function getUserRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/users/:id',
    {
      schema: {
        params: pathParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Params: PathParams }>, reply) => {
      const { id } = request.params;

      const user = await userModel.findById(id).populate('listings');

      if (!user) {
        throw new ResourceNotFoundError({
          resource: 'User',
          id,
        });
      }

      return reply.send(user);
    },
  );
}
