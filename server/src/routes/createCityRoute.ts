/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { type AuthService } from '../common/auth/authService.js';
import { ResourceAlreadyExistsError } from '../common/errors/resourceAlreadyExistsError.js';
import { cityModel } from '../models/cityModel.js';

const headersSchema = Type.Object({
  authorization: Type.String({ minLength: 1 }),
});

type Headers = Static<typeof headersSchema>;

const bodySchema = Type.Object({
  name: Type.String({
    minLength: 1,
    maxLength: 128,
  }),
  voivodeship: Type.String({
    minLength: 1,
    maxLength: 128,
  }),
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
  type: Type.String({
    minLength: 1,
    maxLength: 128,
  }),
  description: Type.Optional(Type.String({ maxLength: 2048 })),
  latitude: Type.Number({
    minimum: -90,
    maximum: 90,
  }),
  longitude: Type.Number({
    minimum: -180,
    maximum: 180,
  }),
});

type Body = Static<typeof bodySchema>;

export function createCityRoute(fastify: FastifyInstance, authService: AuthService): void {
  fastify.post(
    '/api/v1/cities',
    {
      schema: {
        headers: headersSchema,
        body: bodySchema,
      },
    },
    async (
      request: FastifyRequest<{
        Body: Body;
        Headers: Headers;
      }>,
      reply,
    ) => {
      await authService.verifyToken(request.headers.authorization, 'admin');

      const existingCity = await cityModel.findOne({
        name: request.body.name,
        voivodeship: request.body.voivodeship,
      });

      if (existingCity) {
        throw new ResourceAlreadyExistsError({
          resource: 'City',
          name: request.body.name,
          voivodeship: request.body.voivodeship,
        });
      }

      const city = await cityModel.create(request.body);

      return reply.status(201).send(city);
    },
  );
}
