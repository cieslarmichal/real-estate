/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { listingModel } from '../models/listingModel.js';

const queryParamsSchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  pageSize: Type.Optional(Type.Number({ minimum: 1 })),
  type: Type.Optional(Type.Union([Type.Literal('sprzedaż'), Type.Literal('wynajem')])),
  propertyType: Type.Optional(Type.Union([Type.Literal('dom'), Type.Literal('mieszkanie')])),
  locality: Type.Optional(Type.String({ minLength: 1 })),
  minSize: Type.Optional(Type.Number({ minimum: 1 })),
  maxSize: Type.Optional(Type.Number({ minimum: 1 })),
  minPrice: Type.Optional(Type.Number({ minimum: 1 })),
  maxPrice: Type.Optional(Type.Number({ minimum: 1 })),
  rooms: Type.Optional(Type.Number({ minimum: 1 })),
});

type QueryParams = Static<typeof queryParamsSchema>;

export function getLatestListingsRoute(fastify: FastifyInstance): void {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const listingsQuery: any = {
        finished: false,
      };

      if (request.query.type) {
        listingsQuery.type = request.query.type.toLowerCase();
      }

      if (request.query.propertyType) {
        listingsQuery.propertyType = request.query.propertyType.toLowerCase();
      }

      if (request.query.locality) {
        listingsQuery.locality = request.query.locality;
      }

      if (request.query.minSize) {
        listingsQuery.size = { $gte: request.query.minSize };
      }

      if (request.query.maxSize) {
        listingsQuery.size = {
          ...listingsQuery.size,
          $lte: request.query.maxSize,
        };
      }

      if (request.query.minPrice) {
        listingsQuery.price = { $gte: request.query.minPrice };
      }

      if (request.query.maxPrice) {
        listingsQuery.price = {
          ...listingsQuery.price,
          $lte: request.query.maxPrice,
        };
      }

      if (request.query.rooms) {
        listingsQuery.rooms = { $gte: request.query.rooms };
      }

      const [listings, total] = await Promise.all([
        listingModel
          .find(listingsQuery)
          .populate('userRef')
          .populate('cityRef')
          .sort({ createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize),
        listingModel.countDocuments(listingsQuery),
      ]);

      return reply.send({
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
