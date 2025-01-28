/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { type AuthService } from '../common/auth/authService.js';
import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { cityModel } from '../models/cityModel.js';

const headersSchema = Type.Object({
  authorization: Type.String({ minLength: 1 }),
});

type Headers = Static<typeof headersSchema>;

const bodySchema = Type.Object({
  name: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 128,
    }),
  ),
  voivodeship: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 128,
    }),
  ),
  district: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 128,
    }),
  ),
  commune: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 128,
    }),
  ),
  type: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 128,
    }),
  ),
  description: Type.Optional(Type.String({ maxLength: 2048 })),
  latitude: Type.Optional(
    Type.Number({
      minimum: -90,
      maximum: 90,
    }),
  ),
  longitude: Type.Optional(
    Type.Number({
      minimum: -180,
      maximum: 180,
    }),
  ),
});

type Body = Static<typeof bodySchema>;

const pathParamsSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
});

type PathParams = Static<typeof pathParamsSchema>;

export function updateCityRoute(fastify: FastifyInstance, authService: AuthService): void {
  fastify.patch(
    '/api/v1/cities/:id',
    {
      schema: {
        headers: headersSchema,
        body: bodySchema,
        params: pathParamsSchema,
      },
    },
    async (
      request: FastifyRequest<{
        Body: Body;
        Headers: Headers;
        Params: PathParams;
      }>,
      reply,
    ) => {
      await authService.verifyToken(request.headers.authorization, 'admin');

      const existingCity = await cityModel.findById(request.params.id);

      if (!existingCity) {
        throw new ResourceNotFoundError({
          resource: 'City',
          id: request.params.id,
        });
      }

      Object.assign(existingCity, request.body);

      await existingCity.save();

      return reply.status(201).send(existingCity);
    },
  );
}
