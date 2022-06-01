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
        database: configService.get<string>('TYPEORM_DATABASE'),
        port: configService.get<number>('TYPEORM_PORT'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        host: configService.get<string>('TYPEORM_HOST'),
        synchronize: false,
        entities: [User, AuthType, AuthTypeUser, MultiFactorAuthCode],
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('HEROKU_DB'),
        port: configService.get<number>('HEROKU_PORT'),
        password: configService.get<string>('HEROKU_PASSWORD'),
        username: configService.get<string>('HEROKU_USER'),
        host: configService.get<string>('HEROKU_HOST'),
        synchronize: true,
        logging: true,
        entities: [Movie],
        name: 'databaseHeroku',
        ssl: {
          require: true,
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
