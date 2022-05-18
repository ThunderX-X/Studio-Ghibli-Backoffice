import { MigrationInterface, QueryRunner } from 'typeorm';

export class multiFactorAuthentication1652377538484
  implements MigrationInterface
{
  name = 'multiFactorAuthentication1652377538484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "active" boolean NOT NULL DEFAULT false, "profile_picture" text, "password" character varying(256) NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth_types" ("id" SERIAL NOT NULL, "description" character varying(40) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', CONSTRAINT "PK_b3388865f0e47fed0ea4e302d69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "multi_factor_auth_codes" ("code" character varying(20) NOT NULL, "code_type" integer NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "codeTypeId" integer, "userIdId" integer, CONSTRAINT "PK_1db76e4535ebc8b8c357aca171b" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ADD CONSTRAINT "FK_dea043619f6926ef9e1ed73e8bf" FOREIGN KEY ("codeTypeId") REFERENCES "auth_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" ADD CONSTRAINT "FK_49df13f028844e880973066d757" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO  auth_types(description) VALUES('EMAIL')`,
    );
    await queryRunner.query(
      `INSERT INTO  auth_types(description) VALUES('Time-based One Time Password')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" DROP CONSTRAINT "FK_49df13f028844e880973066d757"`,
    );
    await queryRunner.query(
      `ALTER TABLE "multi_factor_auth_codes" DROP CONSTRAINT "FK_dea043619f6926ef9e1ed73e8bf"`,
    );
    await queryRunner.query(`DROP TABLE "multi_factor_auth_codes"`);
    await queryRunner.query(`DROP TABLE "auth_types"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
