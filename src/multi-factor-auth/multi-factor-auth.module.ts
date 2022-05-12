import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiFactorAuthController } from './controllers/multi-factor-auth.controller';
import { CodeType } from './entities/code-types.entity';
import { MultiFactorAuthCode } from './entities/multi-factor-auth-codes.entity';
import { EmailTwoFactorAuthenticationService } from './services/email-two-factor-authentication/email-two-factor-authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeType, MultiFactorAuthCode])],
  controllers: [MultiFactorAuthController],
  providers: [EmailTwoFactorAuthenticationService],
  exports: [TypeOrmModule],
})
export class MultiFactorAuthModule {}
