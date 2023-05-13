import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
  id: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  // constructor(config: ConfigService) {
  //   super({
  //     ignoreExpiration: false,
  //     secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request: Request) => {
  //         let data = request?.cookies['auth-cookie'];
  //         console.log(request.cookies);
  //         if (!data) {
  //           return null;
  //         }
  //         return data.token;
  //       },
  //     ]),
  //   });
  // }

  async validate(payload: JwtPayload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
