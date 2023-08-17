import { BadRequestException } from '@nestjs/common';

export class UserNameDuplicateException extends BadRequestException {
  constructor(
    message = '이미 사용중인 이름 입니다.',
  ) {
    super({ status: 'USER_NAME_DUPLICATE_BAD_REQUEST', message });
  }
}
