import { MigrationInterface, QueryRunner } from 'typeorm';

export class createManagerMigration1655119516734 implements MigrationInterface {
  name = 'createManagerMigration1655119516734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`manager\` (\`manager_id\` varchar(32) NOT NULL, \`email\` varchar(16) NOT NULL, \`phone\` varchar(16) NOT NULL, \`password\` varchar(64) NOT NULL, \`birthday\` timestamp NOT NULL, \`gender\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`manager_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`manager\``);
  }
}
