import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
//import { ClientRequest } from 'http';
//import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
        };
      },
    }),
  ],
  providers: [
    // {
    //   provide: 'API_KEY',
    //   useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    // },
    // {
    //   provide: 'PG',
    //   //useValue: client,
    //   useFactory: (configService: ConfigType<typeof config>) => {
    //     const { user, host, dbName, password, port } = configService.postgres;
    //     const client = new Client({
    //       user,
    //       host,
    //       database: dbName,
    //       password,
    //       port,
    //     });
    //     client.connect();
    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
