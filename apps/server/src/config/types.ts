import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Request } from 'express';

export interface AuthUser {
  id: string
  email: string
  groups: string[]
  expire: Date
}

declare module 'express' {
  export interface Request {
    user?: AuthUser;
  }
}