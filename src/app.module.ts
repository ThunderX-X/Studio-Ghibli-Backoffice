import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { MultiFactorAuthModule } from './multi-factor-auth/multi-factor-auth.module';

@Module({
  imports: [UsersModule, MoviesModule, MultiFactorAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
