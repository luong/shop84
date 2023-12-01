import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Auth } from '@/controllers/filters/auth.decorator';
import { Request, Response } from 'express';
import { CognitoService } from '@/services/cognito.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cognitoService: CognitoService
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const roles = this.reflector.get(Auth, context.getHandler());
      if (roles === undefined) {
        return true;
      }
      const authToken = this.extractTokenFromHeader(request);
      const authResponse = await this.cognitoService.verifyIdToken(authToken!);
      const authUser = {
        id: authResponse.sub,
        email: authResponse.email!.toString(),
        groups: authResponse['cognito:groups'] ?? [],
        expire: new Date(authResponse.exp * 1000)
      }
      request.user = authUser;
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}