import { MigrationInterface, QueryRunner } from 'typeorm';

export class Parameters1653605842163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO auth_types (description) VALUES ('EMAIL')`,
    );

    await queryRunner.query(
      `INSERT INTO auth_types (description) VALUES ('TOTP')`,
    );

    await queryRunner.query(
      `INSERT INTO modules (name, active) VALUES ('Users', TRUE)`,
    );

    await queryRunner.query(
      `INSERT INTO modules (name, active) VALUES ('Movies', TRUE)`,
    );

    await queryRunner.query(
      `INSERT INTO modules (name, active) VALUES ('Roles', TRUE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE modules`);
    await queryRunner.query(`TRUNCATE TABLE auth_types`);
  }
}
