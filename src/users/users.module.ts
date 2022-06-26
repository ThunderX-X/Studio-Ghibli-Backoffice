import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { RolesService } from 'src/auth/services/roles.service';
import { MultiFactorAuthModule } from 'src/multi-factor-auth/multi-factor-auth.module';
@Module({
  imports: [TypeOrmModule, RolesService, MultiFactorAuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
