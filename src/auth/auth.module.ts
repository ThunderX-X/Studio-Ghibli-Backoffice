import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/services/users.service';
import { MultiFactorAuthModule } from '../multi-factor-auth/multi-factor-auth.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TwoFactorStrategy } from './strategies/two-factor.strategy';
import { RolesGuard } from './guards/roles.guard';
import { RolesService } from './services/roles.service';
import { LoguedStrategy } from './strategies/logued.strategy';
import { PermissionsService } from './services/permissions.service';
import { RolesController } from './controllers/roles.controller';
import { UsersModule } from 'src/users/users.module';
import { PermissionsController } from './controllers/permissions.controller';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule,
    MultiFactorAuthModule,
    UsersModule,
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
  controllers: [AuthController, RolesController, PermissionsController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    TwoFactorStrategy,
    RolesGuard,
    RolesService,
    LoguedStrategy,
    PermissionsService,
    FacebookStrategy,
  ],
  exports: [AuthService, RolesGuard, RolesService, LoguedStrategy],
})
export class AuthModule {}
