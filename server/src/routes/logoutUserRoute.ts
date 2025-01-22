/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

const headersSchema = Type.Object({
  authorization: Type.String({ minLength: 1 }),
});

type Headers = Static<typeof headersSchema>;

export function logoutUserRoute(fastify: FastifyInstance): void {
  fastify.post(
    '/api/v1/users/logout',
    {
      schema: {
        headers: headersSchema,
      },
    },
    async (request: FastifyRequest<{ Headers: Headers }>, reply) => {
      const { authorization } = request.headers;

      console.log(authorization);

      // TODO: blacklist the token

      return reply.send();
    },
  );
}
