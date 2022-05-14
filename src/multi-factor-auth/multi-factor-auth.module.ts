import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTwoFactorAuthenticationService } from './services/email-two-factor-authentication.service';
import { AuthCodesService } from './services/auth-codes.service';
import { EmailService } from '../common/email.service';
import { UsersService } from '../users/services/users.service';
import { TwoFactorAuthService } from './services/two-factor-auth.service';
import { TotpTwoFactorAuthService } from './services/totp-two-factor-auth.service';
import { UserAuthsService } from './services/user-auths.service';
@Module({
  imports: [TypeOrmModule],
  providers: [
    EmailTwoFactorAuthenticationService,
    AuthCodesService,
    EmailService,
    UsersService,
    TwoFactorAuthService,
    TotpTwoFactorAuthService,
    UserAuthsService,
  ],
  exports: [
    TypeOrmModule,
    EmailTwoFactorAuthenticationService,
    AuthCodesService,
    EmailService,
    UsersService,
    TwoFactorAuthService,
    TotpTwoFactorAuthService,
  ],
})
export class MultiFactorAuthModule {}
