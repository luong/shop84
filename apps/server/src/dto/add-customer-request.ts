import { IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddCustomerRequest {
  @IsString()
  @IsUUID()
  @IsOptional()
	id?: string;

	@IsString()
  @IsEmail()
	email: string;

  @IsString()
  @IsOptional()
	firstName?: string;

  @IsString()
  @IsOptional()
	lastName?: string;
}
