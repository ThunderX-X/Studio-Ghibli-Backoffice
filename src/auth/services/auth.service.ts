import { Injectable } from '@nestjs/common';
import { AuthCodeTypes } from 'src/multi-factor-auth/enums/auth-codes.enum';
import { TwoFactorAuthService } from 'src/multi-factor-auth/services/two-factor-auth.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly twoFactorService: TwoFactorAuthService,
  ) {}

  validateUserAndPassword(email: string, password: string) {
    const user = this.usersService.findByEmail(email);
    return user;
  }

  validateTwoFactorAuth(userId: number, code: string, authType: AuthCodeTypes) {
    this.twoFactorService.validate(userId, code, authType);
  }
}
