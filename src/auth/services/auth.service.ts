import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCodeTypes } from '../../multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { UsersService } from '../../users/services/users.service';
import { Request } from 'express';
import { Payload } from '../models/payload.model';
import { CryptoService } from '../../common/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly twoFactorService: TwoFactorAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserAndPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const hashedPassword = user.password;
    const match = await CryptoService.verifyPassword(password, hashedPassword);
    if (!match) return null;
    return user;
  }

  validateTwoFactorAuth(userId: number, code: string, authType: AuthCodeTypes) {
    this.twoFactorService.validate(userId, code, authType);
  }

  generateTwoFactorAuth(userId: number, code: string, authType: AuthCodeTypes) {
    this.twoFactorService.validate(userId, code, authType);
  }

  getUserPayload(request: Request): Payload {
    const token = request.headers.authorization?.replace('Bearer', '').trim();
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
