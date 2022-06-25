import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTeahouse1656173383757 implements MigrationInterface {
  name = 'createTeahouse1656173383757';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tea_house_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE', 'REQUEST') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tea_house_image\` (\`id\` varchar(255) NOT NULL, \`tea_house_id\` varchar(255) NOT NULL, \`image_copy\` varchar(255) NOT NULL, \`image_kind\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tea_house\` (\`tea_house_id\` varchar(255) NOT NULL, \`manager_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`tea_house_contract_number\` varchar(255) NULL, \`category_of_business\` varchar(255) NOT NULL, \`schedule\` json NOT NULL, \`business_license_copy\` varchar(255) NULL, \`is_representative\` tinyint NULL, \`instagram_url\` varchar(255) NULL, \`etc_link_url\` varchar(255) NULL, \`status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`address\` varchar(255) NOT NULL, \`detail_address\` varchar(255) NOT NULL, \`postcode\` varchar(255) NOT NULL, PRIMARY KEY (\`tea_house_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`manager\` DROP COLUMN \`gender\``);
    await queryRunner.query(
      `ALTER TABLE \`manager\` ADD \`gender\` enum ('MALE', 'FEMALE') NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`manager\` DROP COLUMN \`gender\``);
    await queryRunner.query(
      `ALTER TABLE \`manager\` ADD \`gender\` varchar(255) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`tea_house\``);
    await queryRunner.query(`DROP TABLE \`tea_house_image\``);
    await queryRunner.query(`DROP TABLE \`tea_house_category\``);
  }
}
