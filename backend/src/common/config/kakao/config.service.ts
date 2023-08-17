import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {kakaoConfig} from "@config/kakao/configuration";

@Injectable()
export class KakaoConfigService {
  constructor(
    @Inject(kakaoConfig.KEY)
    private readonly kakaoConfiguration: ConfigType<typeof kakaoConfig>,
  ) {}

  get clientId() {
    return this.kakaoConfiguration.KAKAO_CLIENT_ID;
  }

  get clientSecret() {
    return this.kakaoConfiguration.KAKAO_CLIENT_SECRET;
  }

  get callbackUrl() {
    return this.kakaoConfiguration.KAKAO_CALLBACK_URL;
  }

  get redirectUrl() {
    return this.kakaoConfiguration.KAKAO_REDIRECT_URL;
  }
}
