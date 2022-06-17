import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from 'src/movies/entities/movie.entity';
import config from '../config';
import { AuthTypeUser } from './entities/auth-types-user.entity';
import { AuthType } from './entities/auth-types.entity';
import { MultiFactorAuthCode } from './entities/multi-factor-auth-codes.entity';
import { RolePermission } from './entities/role-permissions.entity';
import { Role } from './entities/roles.entity';
import { User } from 'src/database/entities/user.entity';
import { Module as ModuleDb } from './entities/modules.entity';
import { Permission } from './entities/permissions.entity';

const backofficeEntities = [
  AuthTypeUser,
  AuthType,
  MultiFactorAuthCode,
  User,
  Role,
  RolePermission,
  ModuleDb,
  Permission,
];
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, port, password, username, host, type } =
          configService.database;
        return {
          type: type as any,
          host,
          port,
          username,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          entities: backofficeEntities,
          ssl: false,
          extra: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    TypeOrmModule.forFeature(backofficeEntities),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('HEROKU_DATABASE'),
        port: configService.get<number>('HEROKU_PORT'),
        password: configService.get<string>('HEROKU_PASSWORD'),
        username: configService.get<string>('HEROKU_USERNAME'),
        host: configService.get<string>('HEROKU_HOST'),
        synchronize: false,
        logging: false,
        entities: [Movie],
        name: 'databaseHeroku',
        ssl: {
          require: false,
          rejectUnauthorized: false,
        },
      }),
      imports: [ConfigModule],
      name: 'databaseHeroku',
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
