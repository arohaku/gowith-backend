import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {Strategy, Profile} from "passport-kakao";
import { VerifyCallback } from 'passport-oauth2';
import {KakaoConfigService} from "@config/kakao/config.service";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(kakaoConfigService: KakaoConfigService) {
    super({
      clientID: kakaoConfigService.clientId,
      clientSecret: kakaoConfigService.clientSecret,
      callbackURL: kakaoConfigService.callbackUrl,
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
