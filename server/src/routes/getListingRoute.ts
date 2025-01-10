/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { listingModel } from '../models/listingModel.js';

const pathParamsSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
});

type PathParams = Static<typeof pathParamsSchema>;

export function getListingRoute(fastify: FastifyInstance): void {
  fastify.get(
    '/api/v1/listings/:id',
    {
      schema: {
        params: pathParamsSchema,
      },
    },
    async (request: FastifyRequest<{ Params: PathParams }>, reply) => {
      const { id } = request.params;

      const listing = await listingModel.findById(id).populate('userRef');

      if (!listing) {
        throw new ResourceNotFoundError({
          resource: 'Listing',
          id,
        });
      }

      return reply.send(listing);
    },
  );
}
