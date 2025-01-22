import { verify } from 'jsonwebtoken';

import { type Config } from '../../config.js';
import { ForbiddenAccessError } from '../errors/forbiddenAccessError.js';
import { UnauthorizedAccessError } from '../errors/unathorizedAccessError.js';

export class AuthService {
  public constructor(private readonly config: Config) {}

  public async verifyToken(
    authorizationHeader: string | undefined,
    expectedRole?: 'user' | 'admin',
  ): Promise<Record<string, string>> {
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

    let tokenPayload: Record<string, string>;

    try {
      tokenPayload = verify(token, this.config.token.secret) as Record<string, string>;
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
