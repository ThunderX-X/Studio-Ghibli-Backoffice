import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
//import { ClientRequest } from 'http';
//import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Producers } from 'src/movies/entities/producer.entity';
import { User } from 'src/users/entities/user.entity';
import config from '../config';

//const API_KEY = '123';
//const API_KEY_PROD = 'PROD1212121SA';

//client.connect();
// client.query('SELECT * FROM users', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

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
          entities: [User],
        };
      },
    }),
    //TypeOrmModule.forFeature(backofficeEntities),
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
        entities: [Movie, Producers],
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
