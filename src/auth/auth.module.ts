import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/services/users.service';
import { MultiFactorAuthModule } from '../multi-factor-auth/multi-factor-auth.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TwoFactorStrategy } from './strategies/two-factor.strategy';
@Module({
  imports: [
    TypeOrmModule,
    MultiFactorAuthModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.crypto.key,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, LocalStrategy, TwoFactorStrategy],
})
export class AuthModule {}
