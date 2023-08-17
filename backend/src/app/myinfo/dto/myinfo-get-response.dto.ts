import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/app/user/entity/user.entity';

export class MyInfoGetResponse {
  @ApiProperty({
    example: 1,
    description: 'user id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'pythonstrup',
    description: 'userName',
    required: true,
  })
  userName: string;

  @ApiProperty({
    example:
      'S3-94cd-4162-a53f-f75e951e39db',
    description: '프로필 이미지',
    required: true,
  })
  profileImage: string;

  @ApiProperty({
    example: '안녕하세요. noah입니다!',
    description: '간단한 자기소개',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 'https://github.com/aroDaddy',
    description: '깃허브 주소',
    required: true,
  })
  githubUrl: string;

  @ApiProperty({
    example: 'https://tistory.com/',
    description: '블로그 주소',
    required: true,
  })
  blogUrl: string;

  static from(user: User) {
    const response = new User();
    response.id = user.id;
    response.userName = user.userName;
    response.profileImage = user.profileImage;
    response.description = user.description;
    response.githubUrl = user.githubUrl;
    response.blogUrl = user.blogUrl;
    return response;
  }
}
