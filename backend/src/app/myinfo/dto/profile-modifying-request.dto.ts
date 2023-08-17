import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ProfileModifyingRequest {
  @ApiProperty({
    example: 'noah',
    description: 'userName',
    required: true,
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example:
      'S3-94cd-4162-a53f-f75e951e39db',
    description: '프로필 이미지',
    required: true,
  })
  @IsString()
  profileImage: string;

  @ApiProperty({
    example: '안녕하세요 noah입니다!',
    description: '간단한 자기소개',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://github.com/aroDaddy',
    description: '깃허브 주소',
    required: true,
  })
  @IsUrl()
  githubUrl: string;

  @ApiProperty({
    example: 'https://tistory.com/',
    description: '블로그 주소',
  })
  @IsString()
  blogUrl: string;
}
