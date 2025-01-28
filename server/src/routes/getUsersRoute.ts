/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { userModel } from '../models/userModel.js';

const queryParamsSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  pageSize: Type.Optional(Type.Number({ minimum: 1 })),
  username: Type.Optional(Type.String({ minLength: 1 })),
  email: Type.Optional(Type.String({ minLength: 1 })),
});

type QueryParams = Static<typeof queryParamsSchema>;

export function getUsersRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/users',
    {
      schema: {
        querystring: queryParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Querystring: QueryParams }>, reply) => {
      const page = request.query.page || 1;

      const pageSize = request.query.pageSize || 10;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const usersQuery: any = {};

      if (request.query.username) {
        usersQuery.username = {
          $regex: `${request.query.username}`,
          $options: 'i',
        };
      }

      if (request.query.email) {
        usersQuery.email = {
          $regex: `${request.query.email}`,
          $options: 'i',
        };
      }

      const [users, total] = await Promise.all([
        userModel
          .find(usersQuery)
          .select('-password')
          .skip((page - 1) * pageSize)
          .limit(pageSize),
        userModel.countDocuments(usersQuery),
      ]);

      return reply.send({
        data: users,
        metadata: {
          page,
          pageSize,
          total,
        },
      });
    },
  );
}
