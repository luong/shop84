import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1701733200303 implements MigrationInterface {
    name = 'Init1701733200303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Address\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`customerId\` varchar(191) NOT NULL, \`firstName\` varchar(45) NOT NULL, \`lastName\` varchar(45) NOT NULL, \`phone\` varchar(45) NOT NULL, \`address1\` varchar(200) NOT NULL, \`address2\` varchar(200) NULL, \`city\` varchar(45) NOT NULL, \`state\` varchar(45) NOT NULL, \`country\` varchar(20) NOT NULL, \`isDefault\` tinyint NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Customer\` (\`id\` varchar(255) NOT NULL, \`email\` varchar(45) NOT NULL, \`firstName\` varchar(45) NULL, \`lastName\` varchar(45) NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`description\` tinytext NULL, \`price\` float NULL, \`quantity\` int NOT NULL DEFAULT '0', \`image\` varchar(200) NULL, \`status\` enum ('Active', 'Archieved') NOT NULL DEFAULT 'Active', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_896e2e0f6dfa6f80117a79e1d7e\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_896e2e0f6dfa6f80117a79e1d7e\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP TABLE \`Category\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
        await queryRunner.query(`DROP TABLE \`Address\``);
    }

}
