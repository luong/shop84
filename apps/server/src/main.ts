import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { CustomValidationPipe } from '@/controllers/filters/custom-validation.pipe';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CognitoService } from '@/services/cognito.service';

async function bootstrap() {
	const logger = new Logger('Main');
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const cognitoService = app.get(CognitoService);
	await cognitoService.getJwks();
	app.useGlobalPipes(new CustomValidationPipe());
	const port = configService.get<number>('app.port');
	await app.listen(port!);
	logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
