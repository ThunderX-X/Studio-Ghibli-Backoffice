import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    appName: process.env.APP_NAME,
    requiredTwoFactor: process.env.REQUIRED_TWO_FACTOR === 'true',
    database: {
      dbName: process.env.BACKOFFICE_DATABASE,
      port: parseInt(process.env.BACKOFFICE_PORT, 10),
      password: process.env.BACKOFFICE_PASSWORD,
      username: process.env.BACKOFFICE_USERNAME,
      host: process.env.BACKOFFICE_HOST,
      type: process.env.BACKOFFICE_CONNECTION,
    },
    database_postgres: {
      dbName: process.env.HEROKU_DATABASE,
      port: parseInt(process.env.HEROKU_PORT, 10),
      password: process.env.HEROKU_PASSWORD,
      username: process.env.HEROKU_USERNAME,
      host: process.env.HEROKU_HOST,
      type: process.env.HEROKU_CONNECTION,
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
    facebookAuth: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    frontendCallback: process.env.FRONTEND_CALLBACK,
  };
});
