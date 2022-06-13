import { MigrationInterface, QueryRunner } from 'typeorm';

export class TwitterLogin1655137709112 implements MigrationInterface {
  name = 'TwitterLogin1655137709112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "twitter_id" character varying(256)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitter_id"`);
  }
}
