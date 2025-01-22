/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { hash } from 'bcrypt';
import { type FastifyRequest, type FastifyInstance } from 'fastify';

import { ResourceAlreadyExistsError } from '../common/errors/resourceAlreadyExistsError.js';
import { type Config } from '../config.js';
import { userModel } from '../models/userModel.js';

const bodySchema = Type.Object({
  email: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 }),
  username: Type.String({ minLength: 1 }),
});

type Body = Static<typeof bodySchema>;

export function registerUserRoute(fastify: FastifyInstance, config: Config): void {
  fastify.post(
    '/api/v1/users/register',
    {
      schema: {
        body: bodySchema,
      },
    },
    async (request: FastifyRequest<{ Body: Body }>, reply) => {
      const { username, password, email } = request.body;

      const emailExists = await userModel.findOne({
        email,
      });

      if (emailExists) {
        throw new ResourceAlreadyExistsError({
          resource: 'User',
          email,
        });
      }

      const usernameExists = await userModel.findOne({
        username,
      });

      if (usernameExists) {
        throw new ResourceAlreadyExistsError({
          resource: 'User',
          username,
        });
      }

      const hashedPassword = await hash(password, config.hashSaltRounds);

      const user = await userModel.create({
        username,
        password: hashedPassword,
        email,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user.toObject();

      return reply.send(userWithoutPassword);
    },
  );
}
