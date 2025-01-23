/* eslint-disable @typescript-eslint/naming-convention */

import { type Static, Type } from '@sinclair/typebox';
import { compare } from 'bcrypt';
import { type FastifyRequest, type FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

import { ResourceNotFoundError } from '../common/errors/resourceNotFoundError.js';
import { type Config } from '../config.js';
import { userModel } from '../models/userModel.js';

const bodySchema = Type.Object({
  email: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 }),
});

type Body = Static<typeof bodySchema>;

export function loginUserRoute(fastify: FastifyInstance, config: Config): void {
  fastify.post(
    '/api/v1/users/login',
    {
      schema: {
        body: bodySchema,
      },
    },
    async (request: FastifyRequest<{ Body: Body }>, reply) => {
      const { email, password } = request.body;

      const existingUser = await userModel.findOne({
        email,
      });

      if (!existingUser) {
        throw new ResourceNotFoundError({
          resource: 'User',
          email,
        });
      }

      const passwordMatches = await compare(password, existingUser.password);

      if (!passwordMatches) {
        throw new ResourceNotFoundError({
          resource: 'User',
          email,
        });
      }

      const token = jwt.sign(
        {
          id: existingUser._id,
          role: existingUser.role,
        },
        config.token.secret,
        {
          expiresIn: '7d',
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = existingUser.toObject();

      return reply.send({
        ...userWithoutPassword,
        token,
      });
    },
  );
}
