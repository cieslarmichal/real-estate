/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { listingModel } from '../models/listingModel.js';

const queryParamsSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  pageSize: Type.Optional(Type.Number({ minimum: 1 })),
  type: Type.Optional(Type.Union([Type.Literal('sprzedaż'), Type.Literal('wynajem')])),
});

type QueryParams = Static<typeof queryParamsSchema>;

export function listingRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/listings',
    {
      schema: {
        querystring: queryParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Querystring: QueryParams }>, reply) => {
      const page = request.query.page || 1;

      const pageSize = request.query.pageSize || 10;

      const type = request.query.type || 'sprzedaż';

      const listingsQuery = {
        finished: false,
        type,
      };

      const [listings, total] = await Promise.all([
        listingModel
          .find(listingsQuery)
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize),
        listingModel.countDocuments(listingsQuery),
      ]);

      reply.send({
        data: listings,
        metadata: {
          page,
          pageSize,
          total,
        },
      });
    },
  );
}
