import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCellphoneMigration1656263779351
  implements MigrationInterface
{
  name = 'createCellphoneMigration1656263779351';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cellphone_verification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`verification_code\` varchar(6) NOT NULL, \`cellphone\` varchar(255) NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`verified_at\` datetime NULL, \`expired_at\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cellphone_verification\``);
  }
}
