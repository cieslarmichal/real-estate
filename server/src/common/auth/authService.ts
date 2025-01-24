import jwt from 'jsonwebtoken';

import { type Config } from '../../config.js';
import { ForbiddenAccessError } from '../errors/forbiddenAccessError.js';
import { UnauthorizedAccessError } from '../errors/unathorizedAccessError.js';

export interface TokenPayload {
  readonly userId: string;
  readonly role: 'user' | 'admin';
}

export class AuthService {
  public constructor(private readonly config: Config) {}

  public async verifyToken(
    authorizationHeader: string | undefined,
    expectedRole?: 'user' | 'admin',
  ): Promise<TokenPayload> {
    if (!authorizationHeader) {
      throw new UnauthorizedAccessError({
        reason: 'Authorization header is missing',
      });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedAccessError({
        reason: 'Token is missing',
        authorizationHeader,
      });
    }

    let tokenPayload: TokenPayload;

    try {
      tokenPayload = jwt.verify(token, this.config.token.secret) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedAccessError({
        reason: 'Invalid access token.',
        originalError: error,
      });
    }

    if (expectedRole && tokenPayload['role'] !== expectedRole) {
      throw new ForbiddenAccessError({
        reason: 'Invalid role',
        expectedRole,
        actualRole: tokenPayload['role'],
      });
    }

    return tokenPayload;
  }
}
