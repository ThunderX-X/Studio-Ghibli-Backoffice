import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ required: false })
  message: string;

  @ApiProperty()
  error: string;
}
