import { ApiProperty } from '@nestjs/swagger';

export class LoguedModel {
  @ApiProperty()
  access_token: string;
}
