import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { UsersPerRoleResponseDto } from '../dtos/users-per-role';

@Injectable()
export class UserAnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async usersPerRole(): Promise<UsersPerRoleResponseDto[]> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    const queryResults = await queryBuilder
      .select('role.description')
      .addSelect('COUNT(0)', 'count')
      .innerJoinAndSelect('user.role', 'role')
      .groupBy('role.id')
      .getRawMany();
    const usersPerRole = queryResults.map(
      (row: any) => new UsersPerRoleResponseDto(row.description, row.count),
    );

    return usersPerRole;
  }
}
