import {MigrationInterface, QueryRunner} from "typeorm";

export class alterAccountUserMigration1654506233691 implements MigrationInterface {
    name = 'alterAccountUserMigration1654506233691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`username\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(64) NOT NULL`);
    }

}
