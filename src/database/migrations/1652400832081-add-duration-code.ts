import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDurationCode1652400832081 implements MigrationInterface {
  name = 'addDurationCode1652400832081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ADD "duration_seconds" integer NOT NULL DEFAULT 300`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" DROP COLUMN "duration_seconds" DEFAULT 300`,
    );
  }
}
