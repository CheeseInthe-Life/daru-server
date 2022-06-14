import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1655207176250 implements MigrationInterface {
  name = 'initialMigration1655207176250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`account_id\` int NOT NULL AUTO_INCREMENT, \`provider_id\` varchar(128) NOT NULL, \`provider_name\` varchar(8) NOT NULL, \`username\` varchar(32) NOT NULL, \`connected_at\` timestamp NOT NULL, \`user_id\` varchar(32) NOT NULL, \`refresh_token\` varchar(256) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7419ea574af4f8207d8aacd37a\` (\`provider_id\`, \`provider_name\`), PRIMARY KEY (\`account_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`manager\` (\`manager_id\` varchar(32) NOT NULL, \`email\` varchar(16) NOT NULL, \`phone\` varchar(16) NOT NULL, \`password\` varchar(64) NOT NULL, \`birthday\` timestamp NOT NULL, \`gender\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`manager_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`user_id\` varchar(32) NOT NULL, \`name\` varchar(16) NOT NULL, \`nickname\` varchar(16) NOT NULL, \`gender\` varchar(8) NULL, \`birth_year\` varchar(4) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`manager\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7419ea574af4f8207d8aacd37a\` ON \`account\``,
    );
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
