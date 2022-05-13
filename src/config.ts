import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    appName: process.env.APP_NAME,
    database: {
      dbName: process.env.TYPEORM_DATABASE,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      password: process.env.TYPEORM_PASSWORD,
      username: process.env.TYPEORM_USERNAME,
      host: process.env.TYPEORM_HOST,
      type: process.env.TYPEORM_CONNECTION,
    },
    email: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: parseInt(process.env.EMAIL_PORT, 10) === 465,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    crypto: {
      key: process.env.ENCRYPTION_KEY,
    },
  };
});
