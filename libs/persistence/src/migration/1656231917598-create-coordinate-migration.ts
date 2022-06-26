import {MigrationInterface, QueryRunner} from "typeorm";

export class createCoordinateMigration1656231917598 implements MigrationInterface {
    name = 'createCoordinateMigration1656231917598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tea_house\` ADD \`city\` enum ('SEOUL', 'BUSAN', 'DEAGU', 'INCHEON', 'GANJU', 'DAEJEON', 'ULSAN', 'GYEONGI', 'GANGWON', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tea_house\` ADD \`latitude\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tea_house\` ADD \`longitude\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tea_house\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`tea_house\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`tea_house\` DROP COLUMN \`city\``);
    }

}
