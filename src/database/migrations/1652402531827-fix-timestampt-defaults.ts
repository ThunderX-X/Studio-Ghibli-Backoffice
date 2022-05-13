import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixTimestamptDefaults1652402531827 implements MigrationInterface {
  name = 'fixTimestamptDefaults1652402531827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_types" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ALTER COLUMN "created_at" SET DEFAULT '2022-05-12 19:16:24.531537+00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT '2022-05-12 19:16:24.531537+00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-05-12 19:16:24.531537+00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types" ALTER COLUMN "updated_at" SET DEFAULT '2022-05-12 19:16:24.531537+00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types" ALTER COLUMN "created_at" SET DEFAULT '2022-05-12 19:16:24.531537+00'`,
    );
  }
}
