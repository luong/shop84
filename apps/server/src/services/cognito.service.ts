import {
  AdminCreateUserCommand,
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallengeCommand,
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';


@Injectable()
export class CognitoService {

  private static readonly JWKS_CACHE_KEY = 'cognito.jwks';
  private static readonly JWKS_CACHE_LIFETIME = 86400;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  public async verifyIdToken(idToken: string): Promise<CognitoIdTokenPayload> {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.configService.get<string>('aws.cognitoPoolId')!,
      tokenUse: 'id',
      clientId: this.configService.get<string>('aws.cognitoClientId')!
    });
    verifier.cacheJwks(await this.getJwks());
    return verifier.verify(idToken, {});
  }

  public async auth(email: string, password: string) {
    const command = new AdminInitiateAuthCommand({
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: { USERNAME: email, PASSWORD: password },
      ClientId: this.configService.get<string>('aws.cognitoClientId')!,
      UserPoolId: this.configService.get<string>('aws.cognitoPoolId')!
    });
    return this.getClient().send(command);
  }

  /**
   * challengeParams format like { USERNAME: '',  NEW_PASSWORD: '' } when challengeName equals NEW_PASSWORD_REQUIRED
   */
  public async responseAuth(challengeName: ChallengeNameType, challengeParams: Record<string, string>, session: string) {
    const command = new AdminRespondToAuthChallengeCommand({
      ClientId: this.configService.get<string>('aws.cognitoClientId')!,
      UserPoolId: this.configService.get<string>('aws.cognitoPoolId')!,
      ChallengeName: challengeName,
      ChallengeResponses: challengeParams,
      Session: session
    });
    return this.getClient().send(command);
  }

  public async createUser(email: string, password: string) {
    const command = new AdminCreateUserCommand({
      UserPoolId: this.configService.get<string>('aws.cognitoPoolId')!,
      Username: email,
      TemporaryPassword: password,
      DesiredDeliveryMediums: ['EMAIL']
    });
    return this.getClient().send(command);
  }

  public async getJwks(): Promise<any> {
    let jwks = await this.cacheManager.get(CognitoService.JWKS_CACHE_KEY);
    if (!jwks) {
      const region = this.configService.get<string>('aws.region');
      const poolId = this.configService.get<string>('aws.cognitoPoolId');
      const url = `https://cognito-idp.${region}.amazonaws.com/${poolId}/.well-known/jwks.json`;
      jwks = await firstValueFrom(this.httpService.get(url).pipe(map((res) => res.data)));
      await this.cacheManager.set(CognitoService.JWKS_CACHE_KEY, jwks, CognitoService.JWKS_CACHE_LIFETIME);
    }
    return jwks;
  }

  private getClient(): CognitoIdentityProviderClient {
    return new CognitoIdentityProviderClient({ 
      region: this.configService.get<string>('aws.region')!,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId')!,
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey')!
      }
    });
  }

}
