import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCartItemTable1701735193269 implements MigrationInterface {
    name = 'AddCartItemTable1701735193269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`CartItem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` varchar(36) NULL, \`productId\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`CartItem\` ADD CONSTRAINT \`FK_baf49fbf6ec1d824d8da0082dbe\` FOREIGN KEY (\`customerId\`) REFERENCES \`Customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`CartItem\` ADD CONSTRAINT \`FK_d26ee078939b94811462a0280d8\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`CartItem\` DROP FOREIGN KEY \`FK_d26ee078939b94811462a0280d8\``);
        await queryRunner.query(`ALTER TABLE \`CartItem\` DROP FOREIGN KEY \`FK_baf49fbf6ec1d824d8da0082dbe\``);
        await queryRunner.query(`DROP TABLE \`CartItem\``);
    }

}
