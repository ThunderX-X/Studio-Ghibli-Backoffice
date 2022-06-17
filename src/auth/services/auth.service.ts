import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCodeTypes } from '../../multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from '../../multi-factor-auth/services/two-factor-auth.service';
import { UsersService } from '../../users/services/users.service';
import { Request } from 'express';
import { Payload } from '../models/payload.model';
import { CryptoService } from '../../common/crypto.service';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly twoFactorService: TwoFactorAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserAndPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid login');
    const passwordMatch = await this.hasPasswordMatch(user, password);
    if (!passwordMatch) return null;
    return user;
  }

  async hasPasswordMatch(user: User, passwordToVerify): Promise<boolean> {
    const hashedPassword = user?.password;
    if (!hashedPassword)
      throw new BadRequestException("Password can't be empty");
    const match = await CryptoService.verifyPassword(
      passwordToVerify,
      hashedPassword,
    );
    return match;
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
