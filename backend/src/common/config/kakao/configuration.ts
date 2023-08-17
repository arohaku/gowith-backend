import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { validate } from '@config/validate';
import { registerAs } from '@nestjs/config';

export class KakaoConfig {
  @IsString()
  @Expose()
  KAKAO_CLIENT_ID: string;

  @IsString()
  @Expose()
  KAKAO_CLIENT_SECRET: string;

  @IsString()
  @Expose()
  KAKAO_CALLBACK_URL: string;

  @IsString()
  @Expose()
  KAKAO_REDIRECT_URL: string;
}

export const kakaoConfig = registerAs('KAKAO', () =>
  validate(process.env, KakaoConfig),
);
