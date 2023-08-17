import { Module } from '@nestjs/common';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { GithubConfigModule } from '@config/github/config.module';
import { GithubStrategy } from '@app/auth/github.strategy';
import { UserModule } from '@app/user/user.module';
import {KakaoConfigModule} from "@config/kakao/config.module";
import {KakaoStrategy} from "@app/auth/kakao.strategy";

@Module({
  imports: [UserModule, PassportModule, GithubConfigModule, KakaoConfigModule],
  controllers: [AuthController],
  providers: [AuthService, GithubStrategy, KakaoStrategy],
})
export class AuthModule {}
