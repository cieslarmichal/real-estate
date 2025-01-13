/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { cityModel } from '../models/cityModel.js';

const queryParamsSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  pageSize: Type.Optional(Type.Number({ minimum: 1 })),
  name: Type.Optional(Type.String({ minLength: 1 })),
  voivodeship: Type.Optional(Type.String({ minLength: 1 })),
});

type QueryParams = Static<typeof queryParamsSchema>;

export function getCitiesRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/cities',
    {
      schema: {
        querystring: queryParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Querystring: QueryParams }>, reply) => {
      const page = request.query.page || 1;

      const pageSize = request.query.pageSize || 10;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const citiesQuery: any = {};

      if (request.query.name) {
        citiesQuery.name = {
          $regex: `^${request.query.name}`,
          options: 'i',
        };
      }

      if (request.query.voivodeship) {
        citiesQuery.voivodeship = {
          $regex: `^${request.query.voivodeship}`,
          options: 'i',
        };
      }

      const [cities, total] = await Promise.all([
        cityModel
          .find(citiesQuery)
          .skip((page - 1) * pageSize)
          .limit(pageSize),
        cityModel.countDocuments(citiesQuery),
      ]);

      return reply.send({
        data: cities,
        metadata: {
          page,
          pageSize,
          total,
        },
      });
    },
  );
}
