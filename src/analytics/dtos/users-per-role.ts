import { ApiProperty } from '@nestjs/swagger';

export class UsersPerRoleResponseDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  count: number;

  constructor(description: string, count: number) {
    this.description = description;
    this.count = count;
  }
}
