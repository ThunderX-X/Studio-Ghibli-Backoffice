import { Module } from '@nestjs/common';
import { MultiFactorAuthController } from './controllers/multi-factor-auth.controller';
import { MultiFactorAuthService } from './services/multi-factor-auth.service';

@Module({
  controllers: [MultiFactorAuthController],
  providers: [MultiFactorAuthService],
})
export class MultiFactorAuthModule {}
