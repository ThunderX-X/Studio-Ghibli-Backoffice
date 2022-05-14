import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from 'src/multi-factor-auth/services/two-factor-auth.service';
import { UsersService } from 'src/users/services/users.service';
import { Request } from 'express';
import { Payload } from '../models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly twoFactorService: TwoFactorAuthService,
    private readonly jwtService: JwtService,
  ) {}

  validateUserAndPassword(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    return user;
  }

  validateTwoFactorAuth(userId: number, code: string, authType: AuthCodeTypes) {
    this.twoFactorService.validate(userId, code, authType);
  }

  generateTwoFactorAuth(userId: number, code: string, authType: AuthCodeTypes) {
    this.twoFactorService.validate(userId, code, authType);
  }

  getUserPayload(request: Request): Payload {
    const token = request.headers.authorization;
    const payload = this.jwtService.decode(token) as Payload;
    this.hasPayload(payload);
    return payload;
  }

  getUserId(request: Request) {
    const payload = this.getUserPayload(request);
    return payload.sub;
  }

  private hasPayload(payload: Payload) {
    if (!payload) throw new ForbiddenException('Not authenticated');
  }
}
