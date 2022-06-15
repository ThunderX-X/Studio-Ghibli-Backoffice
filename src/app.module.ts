import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { MultiFactorAuthModule } from './multi-factor-auth/multi-factor-auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        BACKOFFICE_CONNECTION: Joi.string().required(),
        BACKOFFICE_HOST: Joi.string().required(),
        BACKOFFICE_USERNAME: Joi.string().required(),
        BACKOFFICE_PASSWORD: Joi.string().required(),
        BACKOFFICE_DATABASE: Joi.string().required(),
        BACKOFFICE_PORT: Joi.number().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        ENCRYPTION_KEY: Joi.string().required(),
        HASH_FUNCTION: Joi.string().required(),
        CIPHER_ALGORITM: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        REQUIRED_TWO_FACTOR: Joi.boolean().required(),
        HEROKU_CONNECTION: Joi.string().required(),
        HEROKU_HOST: Joi.string().required(),
        HEROKU_USERNAME: Joi.string().required(),
        HEROKU_PASSWORD: Joi.string().required(),
        HEROKU_DATABASE: Joi.string().required(),
        HEROKU_PORT: Joi.number().required(),
        TWITTER_CLIENT_ID: Joi.string().required(),
        TWITTER_CLIENT_SECRET: Joi.string().required(),
        TWITTER_CALLBACK_URL: Joi.string().required(),
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_CLIENT_SECRET: Joi.string().required(),
        FACEBOOK_CALLBACK_URL: Joi.string().required(),
        FRONTEND_CALLBACK: Joi.string().required(),
      }),
    }),
    UsersModule,
    MoviesModule,
    MultiFactorAuthModule,
    DatabaseModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
