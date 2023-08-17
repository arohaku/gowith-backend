import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KakaoConfigService } from '@config/kakao/config.service';
import {kakaoConfig} from "@config/kakao/configuration";

@Module({
  imports: [ConfigModule.forFeature(kakaoConfig)],
  providers: [KakaoConfigService],
  exports: [KakaoConfigService],
})
export class KakaoConfigModule {}
