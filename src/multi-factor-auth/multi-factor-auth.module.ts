import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiFactorAuthController } from './controllers/multi-factor-auth.controller';
import { AuthType } from './entities/auth-types.entity';
import { MultiFactorAuthCode } from './entities/multi-factor-auth-codes.entity';
import { EmailTwoFactorAuthenticationService } from './services/email-two-factor-authentication.service';
import { AuthCodesService } from './services/auth-codes.service';
import { EmailService } from '../common/email.service';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthType, MultiFactorAuthCode])],
  controllers: [MultiFactorAuthController],
  providers: [
    EmailTwoFactorAuthenticationService,
    AuthCodesService,
    EmailService,
    UsersService,
  ],
  exports: [TypeOrmModule],
})
export class MultiFactorAuthModule {}
