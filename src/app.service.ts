/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
//import { rejects } from 'assert';
//import { Client } from 'pg';

 @Injectable()
 export class AppService {}
//   constructor(
//     @Inject('PG') private clientPg: Client,
//   ) {}
//   getHello(): string {
//     return 'Hello World!';
//   }

//   getUs() {
//     return new Promise((resolve, reject) => {0
//       this.clientPg.query('SELECT * FROM users', (err, res) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(res.rows);
//       });
//     });
//   }
// }
