import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GithubAuthGuard } from '@app/auth/github-auth.guard';
import { RequestGithubProfile } from '@app/auth/github-profile.decorator';
import { GithubProfile } from '@app/auth/type/github-profile';
import { AuthService } from '@app/auth/auth.service';
import { JwtTokenService } from '@common/module/jwt-token/jwt-token.service';
import { GithubConfigService } from '@config/github/config.service';
import { CookieConfigService } from '@config/cookie/config.service';
import { ApiSuccessResponse } from '@src/common/decorator/api-success-resposne.decorator';
import {KakaoConfigService} from "@config/kakao/config.service";
import {KakaoAuthGuard} from "@app/auth/kakao-auth.guard";
import {KakaoProfile} from "@app/auth/type/kakao-profile";
import {RequestKakaoProfile} from "@app/auth/kakao-profile.decorator";

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly githubConfigService: GithubConfigService,
    private readonly kakaoConfigService: KakaoConfigService,
    private readonly cookieConfigService: CookieConfigService,
  ) {}

  @Get('/github/login')
  @UseGuards(GithubAuthGuard)

  githubLogin() {
    console.log("!!!!")
    return;
  }

  @Get('/github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(
    @RequestGithubProfile() githubProfile: GithubProfile,
    @Res() response: Response,
  ) {
    const user = await this.authService.githubLogin({
      id: githubProfile.id,
      profileImage: githubProfile._json.avatar_url,
      blogUrl: githubProfile._json.blog,
      githubUrl: githubProfile.profileUrl,
      socialType: 'GITHUB',
    });

    const { accessToken, accessTokenExpires } =
      this.jwtTokenService.generateAccessToken(user);
    const { refreshToken, refreshTokenExpires } =
      this.jwtTokenService.generateRefreshToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(accessTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: new Date(refreshTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });

    response.redirect(this.githubConfigService.redirectUrl);
  }

  @Get('/kakao/login')
  @UseGuards(KakaoAuthGuard)

  kakaoLogin() {
    console.log("!!!!")
    return;
  }

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(
      @RequestKakaoProfile() kakaoProfile: KakaoProfile,
      @Res() response: Response,
  ) {
    console.log("!!!"+response);
    const user = await this.authService.kakaoLogin({
      id: kakaoProfile.id,
      profileImage: kakaoProfile._json.profile_image,
      socialType: 'KAKAO',
      userName: kakaoProfile._json.name,
    });

    const { accessToken, accessTokenExpires } =
        this.jwtTokenService.generateAccessToken(user);
    const { refreshToken, refreshTokenExpires } =
        this.jwtTokenService.generateRefreshToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(accessTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: new Date(refreshTokenExpires * 1000),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    });

    response.redirect(this.kakaoConfigService.redirectUrl);
  }

  @Post('logout')
  @ApiSuccessResponse(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
  }




}
