import {MigrationInterface, QueryRunner} from "typeorm";

export class heroku1653611210214 implements MigrationInterface {
    name = 'heroku1653611210214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "active" boolean NOT NULL DEFAULT false, "profile_picture" text, "password" character varying(256) NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth_types" ("id" SERIAL NOT NULL, "description" character varying(40) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', CONSTRAINT "PK_b3388865f0e47fed0ea4e302d69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth_types_user" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "auth_type_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "userIdId" integer, "authTypeIdId" integer, CONSTRAINT "PK_fdb635771c3d07bf8a0b1010edd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "multi_factor_auth_codes" ("code" character varying(100) NOT NULL, "code_type" integer NOT NULL, "user_id" integer NOT NULL, "duration_seconds" integer NOT NULL DEFAULT '300', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "codeTypeId" integer, "userIdId" integer, CONSTRAINT "PK_1db76e4535ebc8b8c357aca171b" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "original_title" character varying NOT NULL, "release_year" integer NOT NULL, "wiki_link" character varying NOT NULL, "music" character varying NOT NULL, "duration" integer NOT NULL, "cover" character varying NOT NULL, "banner" character varying NOT NULL, "description" text NOT NULL, "trailer" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth_types_user" ADD CONSTRAINT "FK_95e9bed64908fefe11e0b4b1a71" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_types_user" ADD CONSTRAINT "FK_71b5ab7dc99ffd877979b7f51f3" FOREIGN KEY ("authTypeIdId") REFERENCES "auth_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "multi_factor_auth_codes" ADD CONSTRAINT "FK_dea043619f6926ef9e1ed73e8bf" FOREIGN KEY ("codeTypeId") REFERENCES "auth_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "multi_factor_auth_codes" ADD CONSTRAINT "FK_49df13f028844e880973066d757" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "multi_factor_auth_codes" DROP CONSTRAINT "FK_49df13f028844e880973066d757"`);
        await queryRunner.query(`ALTER TABLE "multi_factor_auth_codes" DROP CONSTRAINT "FK_dea043619f6926ef9e1ed73e8bf"`);
        await queryRunner.query(`ALTER TABLE "auth_types_user" DROP CONSTRAINT "FK_71b5ab7dc99ffd877979b7f51f3"`);
        await queryRunner.query(`ALTER TABLE "auth_types_user" DROP CONSTRAINT "FK_95e9bed64908fefe11e0b4b1a71"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "multi_factor_auth_codes"`);
        await queryRunner.query(`DROP TABLE "auth_types_user"`);
        await queryRunner.query(`DROP TABLE "auth_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
