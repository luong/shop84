import { BadRequestException, Injectable, Logger, ValidationError, ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
	constructor() {
		const logger = new Logger(CustomValidationPipe.name);
		logger.log('Applying custom validation pipe');
		super({
			exceptionFactory: (errors: ValidationError[]) => {
				const result = errors.map((error) => ({
					property: error.property,
					message: error?.constraints ? error.constraints[Object.keys(error.constraints)[0]] : ''
				}));
				return new BadRequestException(result);
			},
			stopAtFirstError: true,
			whitelist: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true }
		});
	}
}
