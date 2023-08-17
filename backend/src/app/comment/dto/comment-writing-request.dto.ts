import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CommentWritingRequest {
  @ApiProperty({
    example: 1,
    description: '모집 게시판 아이디',
  })
  @IsNumber()
  articleId: number;

  @ApiProperty({
    example: '모임의 목적이 무엇일까요?',
    description: '댓글 내용',
  })
  @IsString()
  contents: string;
}
