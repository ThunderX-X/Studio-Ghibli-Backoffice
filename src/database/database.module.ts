import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
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
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, port, password, username, host, type } =
          configService.database_postgres;
        return {
          type: type as any,
          host,
          port,
          username,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
          models: [Movie],
        };
      },
    }),
    TypeOrmModule.forFeature([
      AuthTypeUser,
      AuthType,
      MultiFactorAuthCode,
      User,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class DatabaseModule {}
