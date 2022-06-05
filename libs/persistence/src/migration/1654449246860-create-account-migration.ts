import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAccountMigration1654449246860 implements MigrationInterface {
  name = 'createAccountMigration1654449246860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`account_id\` int NOT NULL AUTO_INCREMENT, \`provider_id\` varchar(128) NOT NULL, \`provider_name\` varchar(8) NOT NULL, \`status\` varchar(16) NOT NULL, \`connected_at\` timestamp NULL, \`user_id\` varchar(32) NULL, \`refresh_token\` varchar(256) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7419ea574af4f8207d8aacd37a\` (\`provider_id\`, \`provider_name\`), PRIMARY KEY (\`account_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`provider_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(16) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`gender\` varchar(8) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`birth_year\` varchar(4) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`user_id\` varchar(32) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`provider_id\` varchar(128) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(64) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`nickname\` varchar(16) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`provider_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`provider_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD PRIMARY KEY (\`user_id\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deleted_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birth_year\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`provider_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7419ea574af4f8207d8aacd37a\` ON \`account\``,
    );
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
