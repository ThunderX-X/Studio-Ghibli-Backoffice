import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Movie } from 'src/movies/entities/movie.entity';
import config from '../config';
import { AuthTypeUser } from './entities/auth-types-user.entity';
import { AuthType } from './entities/auth-types.entity';
import { MultiFactorAuthCode } from './entities/multi-factor-auth-codes.entity';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService, config.KEY],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('BACKOFFICE_DATABASE'),
        port: configService.get<number>('BACKOFFICE_PORT'),
        password: configService.get<string>('BACKOFFICE_PASSWORD'),
        username: configService.get<string>('BACKOFFICE_USERNAME'),
        host: configService.get<string>('BACKOFFICE_HOST'),
        synchronize: false,
        entities: [User, AuthType, AuthTypeUser, MultiFactorAuthCode],
      }),
    }),
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
        logging: true,
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
  exports: [TypeOrmModule],
  providers: [],
})
export class DatabaseModule {}
