import { Login } from '@/dto/login';
import { OkResponse } from '@/dto/ok-response';
import { CognitoService } from '@/services/cognito.service';
import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	constructor(private readonly cognitoService: CognitoService) {}

	@Post('/login')
	async login(@Body() login: Login): Promise<OkResponse<any>> {
		try {
			const result = await this.cognitoService.auth(login.email, login.password);
			return {
				statusCode: HttpStatus.OK,
				data: { message: result }
			};
		} catch(err) {
			throw new UnauthorizedException();
		}
	}

}
