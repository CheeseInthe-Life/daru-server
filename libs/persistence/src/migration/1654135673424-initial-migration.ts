import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1654135673424 implements MigrationInterface {
  name = 'initialMigration1654135673424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`user_id\` varchar(255) NOT NULL, \`provider_id\` varchar(255) NOT NULL, \`provider_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_entity\``);
  }
}
