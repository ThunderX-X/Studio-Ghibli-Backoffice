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
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'nnohbagqhspojb',
      password:
        'c49ab6d16b7ac2d5c81a8a1b3fbbc5b3e66ecf1e09f0fa9a35e6cd0276b2eb9b',
      database: 'dbhb2umn3fp1vm',
      name: 'albumsConnection',
      host: 'ec2-34-192-210-139.compute-1.amazonaws.com',
      synchronize: false,
      entities: [Movie],
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
