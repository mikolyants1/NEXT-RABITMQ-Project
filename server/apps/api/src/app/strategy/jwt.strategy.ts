import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from '@nestjs/passport';
import { JwtPayloadDto } from "@server1/apidocs";
import {Strategy,ExtractJwt} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config:ConfigService){
      super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secretOrKey:config.get("JWT_SECRET")
      })
    }

    async validate(payload:JwtPayloadDto){
      return {...payload};
    }
}