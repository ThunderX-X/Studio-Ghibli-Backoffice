import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiFactorAuthModule } from '../multi-factor-auth/multi-factor-auth.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [TypeOrmModule, MultiFactorAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
