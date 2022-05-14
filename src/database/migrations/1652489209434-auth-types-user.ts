import { MigrationInterface, QueryRunner } from 'typeorm';

export class authTypesUser1652489209434 implements MigrationInterface {
  name = 'authTypesUser1652489209434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth_types_user" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "auth_type_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "userIdId" integer, "authTypeIdId" integer, CONSTRAINT "PK_fdb635771c3d07bf8a0b1010edd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types_user" ADD CONSTRAINT "FK_95e9bed64908fefe11e0b4b1a71" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types_user" ADD CONSTRAINT "FK_71b5ab7dc99ffd877979b7f51f3" FOREIGN KEY ("authTypeIdId") REFERENCES "auth_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth_types_user" DROP CONSTRAINT "FK_71b5ab7dc99ffd877979b7f51f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth_types_user" DROP CONSTRAINT "FK_95e9bed64908fefe11e0b4b1a71"`,
    );
    await queryRunner.query(`DROP TABLE "auth_types_user"`);
  }
}
