import { CryptoService } from 'src/common/crypto.service';
import { MigrationInterface, QueryRunner } from 'typeorm';

const adminPassword = process.env.ADMIN_PASSWORD || 'Backofficepass123*';

export class RolesConfig1653694724934 implements MigrationInterface {
  name = 'RolesConfig1653694724934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await CryptoService.hashPassword(adminPassword);
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP COLUMN "active"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" TYPE varchar(512)`,
    );
    await queryRunner.query(
      `INSERT INTO roles(description, active) VALUES ('Admin', true)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('All:Users', TRUE, TRUE, TRUE, TRUE, TRUE, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('All:Movies', TRUE, TRUE, TRUE, TRUE, TRUE, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('All:Roles', TRUE, TRUE, TRUE, TRUE, TRUE, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Read:Users', FALSE, TRUE, FALSE, FALSE, TRUE, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Read:Movies', FALSE, TRUE, FALSE, FALSE, TRUE, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Read:Roles', FALSE, TRUE, FALSE, FALSE, TRUE, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Create:Users', TRUE, FALSE, FALSE, FALSE, TRUE, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Create:Movies', TRUE, FALSE, FALSE, FALSE, TRUE, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Create:Roles', TRUE, FALSE, FALSE, FALSE, TRUE, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Update:Users', FALSE, TRUE, FALSE, FALSE, TRUE, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Update:Movies', FALSE, TRUE, FALSE, FALSE, TRUE, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Update:Roles', FALSE, TRUE, FALSE, FALSE, TRUE, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Delete:Users', FALSE, FALSE, FALSE, TRUE, TRUE, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Delete:Movies', FALSE, FALSE, FALSE, TRUE, TRUE, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO permissions (name, "create", "read", "update", "delete", "active", module_id) VALUES ('Delete:Roles', FALSE, FALSE, FALSE, TRUE, TRUE, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO role_permissions (role_id, permission_id) VALUES(1, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO role_permissions (role_id, permission_id) VALUES(1, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO role_permissions (role_id, permission_id) VALUES(1, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, email, active, profile_picture, password, role_id) VALUES('Admin', 'Admin', 'admin@backoffice.studio', TRUE, '', '${hashedPassword}', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(256) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD "active" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`TRUNCATE TABLE users`);
    await queryRunner.query(`TRUNCATE TABLE role_permissions`);
    await queryRunner.query(`TRUNCATE TABLE permissions`);
    await queryRunner.query(`TRUNCATE TABLE roles`);
  }
}
