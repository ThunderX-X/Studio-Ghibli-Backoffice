import { MigrationInterface, QueryRunner } from 'typeorm';

export class expandCodeLength1652398361368 implements MigrationInterface {
  name = 'expandCodeLength1652398361368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ALTER COLUMN "code" TYPE varchar(100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ALTER COLUMN "code" TYPE varchar(20)`,
    );
  }
}
