import config from '@/config/config';
import { AuthController } from '@/controllers/auth.controller';
import { CustomersController } from '@/controllers/customers.controller';
import { OrdersController } from '@/controllers/orders.controller';
import { ProductsController } from '@/controllers/products.controller';
import { Category } from '@/entity/category';
import { Customer } from '@/entity/customer';
import { Product } from '@/entity/product';
import { CognitoService } from '@/services/cognito.service';
import { CustomersService } from '@/services/customers.service';
import { ProductsService } from '@/services/products.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthGuard } from '@/controllers/filters/auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, cache: true, load: [config] }),
		CacheModule.register({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('database')!
		}),
		TypeOrmModule.forFeature([Product, Category, Customer]),
		HttpModule
	],
	controllers: [ProductsController, CustomersController, OrdersController, AuthController],
	providers: [
		ProductsService,
		CustomersService,
		CognitoService,
		{
      provide: APP_GUARD,
      useClass: AuthGuard
    }
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
