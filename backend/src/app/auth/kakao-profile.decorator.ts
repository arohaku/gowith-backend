import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {KakaoProfile} from "@app/auth/type/kakao-profile";

export const RequestKakaoProfile = createParamDecorator(
  (data, ctx: ExecutionContext): KakaoProfile => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
