import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Global()
@Module({})
export class CommonModule {
  exports: [EmailService];
}
