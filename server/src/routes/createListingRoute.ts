/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { Decode } from '@sinclair/typebox/value';
import { type FastifyRequest, type FastifyInstance } from 'fastify';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import path from 'path';
import { fileURLToPath } from 'url';

const streamPipeline = promisify(pipeline);

import { type AuthService } from '../common/auth/authService.js';
import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { listingModel } from '../models/listingModel.js';
import { userModel } from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const headersSchema = Type.Object({
  authorization: Type.String({ minLength: 1 }),
});

type Headers = Static<typeof headersSchema>;

const bodySchema = Type.Object({
  title: Type.String({
    minLength: 1,
    maxLength: 128,
  }),
  description: Type.String({
    minLength: 1,
    maxLength: 20000,
  }),
  price: Type.Number({ minimum: 1 }),
  rooms: Type.Number({ minimum: 1 }),
  bathrooms: Type.Number({ minimum: 0 }),
  floor: Type.Number({ minimum: 0 }),
  size: Type.Number({ minimum: 1 }),
  locality: Type.String({
    minLength: 1,
    maxLength: 128,
  }),
  address: Type.String({
    minLength: 1,
    maxLength: 256,
  }),
  latitude: Type.String(),
  longitude: Type.String(),
  voivodeship: Type.String(),
  type: Type.Union([Type.Literal('sprzedaż'), Type.Literal('wynajem')]),
  propertyType: Type.Union([
    Type.Literal('mieszkanie'),
    Type.Literal('dom'),
    Type.Literal('działka'),
    Type.Literal('lokal użytkowy'),
    Type.Literal('garaż'),
    Type.Literal('hale i magazyny'),
  ]),
});

export function createListingRoute(fastify: FastifyInstance, authService: AuthService): void {
  fastify.post(
    '/api/v1/listings',
    {
      schema: {
        headers: headersSchema,
      },
    },
    async (
      request: FastifyRequest<{
        Body: Body;
        Headers: Headers;
      }>,
      reply,
    ) => {
      const { userId } = await authService.verifyToken(request.headers.authorization);

      const existingUser = await userModel.findById(userId);

      if (!existingUser) {
        throw new ResourceNotFoundError({
          resource: 'User',
          id: userId,
        });
      }

      const imageUrls: string[] = [];

      const fields: Record<string, unknown> = {};

      const parts = request.parts();

      for await (const part of parts) {
        if (part.type === 'file') {
          const fileExtension = part.filename.split('.')?.pop();

          if (!fileExtension || !['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            continue;
          }

          const imagePath = `/img/files/${new Date().getTime()}-${part.filename}`;

          imageUrls.push(imagePath);

          const filePath = path.join(__dirname, '..', '..', 'public', imagePath);

          await streamPipeline(part.file, createWriteStream(filePath));
        } else {
          fields[part.fieldname] = part.value;
        }
      }

      const parsedFields = {
        title: fields['title'],
        description: fields['description'],
        price: parseInt(fields['price'] as string, 10),
        rooms: parseInt(fields['rooms'] as string, 10),
        bathrooms: parseInt(fields['bathrooms'] as string, 10),
        floor: parseInt(fields['floor'] as string, 10),
        size: parseInt(fields['size'] as string, 10),
        locality: fields['locality'],
        address: fields['address'],
        latitude: fields['latitude'],
        longitude: fields['longitude'],
        voivodeship: fields['voivodeship'],
        type: fields['type'],
        propertyType: fields['propertyType'],
      };

      const listingBody = Decode(bodySchema, parsedFields);

      const listing = await listingModel.create({
        ...listingBody,
        imageUrls,
        userRef: existingUser,
        userId: existingUser._id,
      });

      existingUser.listings.push(listing._id);

      await existingUser.save();

      return reply.status(201).send(listing);
    },
  );
}
