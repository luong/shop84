import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1701757499006 implements MigrationInterface {
    name = 'AddTables1701757499006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`OrderItem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '0', \`price\` float NOT NULL DEFAULT '0', \`priceSet\` float NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(50) NULL, \`productId\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` float NOT NULL DEFAULT '0', \`method\` enum ('Cash', 'BrainTree') NOT NULL DEFAULT 'BrainTree', \`status\` enum ('Pending', 'Success', 'Error') NOT NULL DEFAULT 'Pending', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(50) NULL, \`customerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Coupon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`value\` float NOT NULL DEFAULT '0', \`valueType\` enum ('Fixed', 'Percentage') NOT NULL DEFAULT 'Fixed', \`scope\` enum ('Subtotal', 'Shipping') NOT NULL DEFAULT 'Subtotal', \`status\` enum ('Active', 'Archieved') NOT NULL DEFAULT 'Active', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OrderCoupon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` float NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` varchar(50) NULL, \`couponId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` varchar(50) NOT NULL, \`originalSubtotal\` float NOT NULL DEFAULT '0', \`originalShipping\` float NOT NULL DEFAULT '0', \`originalTotal\` float NOT NULL DEFAULT '0', \`subtotal\` float NOT NULL DEFAULT '0', \`coupon\` float NOT NULL DEFAULT '0', \`shipping\` float NOT NULL DEFAULT '0', \`total\` float NOT NULL DEFAULT '0', \`status\` enum ('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending', \`shippingAddress\` text NULL, \`cancelledAt\` timestamp NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customerId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`CartItem\` CHANGE \`quantity\` \`quantity\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD \`customerId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`OrderItem\` ADD CONSTRAINT \`FK_c94ace27164b9ffde93ebdbe95c\` FOREIGN KEY (\`orderId\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderItem\` ADD CONSTRAINT \`FK_5b590ac1105dfd63b399cdc79bb\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_23b99029eabbb5212833ed37957\` FOREIGN KEY (\`orderId\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Payment\` ADD CONSTRAINT \`FK_24be6c761ced85b109304e227ac\` FOREIGN KEY (\`customerId\`) REFERENCES \`Customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderCoupon\` ADD CONSTRAINT \`FK_0784c54a629ec4d3f1baa5785bd\` FOREIGN KEY (\`orderId\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderCoupon\` ADD CONSTRAINT \`FK_0d21e9c6901c242bb341ffdcaf2\` FOREIGN KEY (\`couponId\`) REFERENCES \`Coupon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_0f88449168b8ffae36cb3f8a140\` FOREIGN KEY (\`customerId\`) REFERENCES \`Customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD CONSTRAINT \`FK_8504c9fdeabd51cd7496047bc81\` FOREIGN KEY (\`customerId\`) REFERENCES \`Customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Address\` DROP FOREIGN KEY \`FK_8504c9fdeabd51cd7496047bc81\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_0f88449168b8ffae36cb3f8a140\``);
        await queryRunner.query(`ALTER TABLE \`OrderCoupon\` DROP FOREIGN KEY \`FK_0d21e9c6901c242bb341ffdcaf2\``);
        await queryRunner.query(`ALTER TABLE \`OrderCoupon\` DROP FOREIGN KEY \`FK_0784c54a629ec4d3f1baa5785bd\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_24be6c761ced85b109304e227ac\``);
        await queryRunner.query(`ALTER TABLE \`Payment\` DROP FOREIGN KEY \`FK_23b99029eabbb5212833ed37957\``);
        await queryRunner.query(`ALTER TABLE \`OrderItem\` DROP FOREIGN KEY \`FK_5b590ac1105dfd63b399cdc79bb\``);
        await queryRunner.query(`ALTER TABLE \`OrderItem\` DROP FOREIGN KEY \`FK_c94ace27164b9ffde93ebdbe95c\``);
        await queryRunner.query(`ALTER TABLE \`Address\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`Address\` ADD \`customerId\` varchar(191) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`CartItem\` CHANGE \`quantity\` \`quantity\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`OrderCoupon\``);
        await queryRunner.query(`DROP TABLE \`Coupon\``);
        await queryRunner.query(`DROP TABLE \`Payment\``);
        await queryRunner.query(`DROP TABLE \`OrderItem\``);
    }

}
