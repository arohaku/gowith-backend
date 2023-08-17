import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@app/comment/entity/comment.entity';
import { User } from '@src/app/user/entity/user.entity';

export class CommentResponse {
  @ApiProperty({
    example: 1,
    description: '댓글 아이디',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: '댓글 작성자 아이디',
  })
  authorId: number;

  @ApiProperty({
    example: 'tester',
    description: '댓글 작성자 유저 이름',
  })
  authorName: string;

  @ApiProperty({
    example:
      'S3-94cd-4162-a53f-f75e951e39db',
    description: '댓글 작성자의 프로필 이미지',
  })
  authorProfileImage: string;

  @ApiProperty({
    example: '제 생일입니다!',
    description: '댓글 내용',
  })
  contents: string;

  @ApiProperty({
    example: '2023/04/07',
    description: '댓글 작성일',
  })
  createdAt: string;

  static from(comment: Comment, user: User) {
    const response = new CommentResponse();
    response.id = comment.id;
    response.authorId = user.id;
    response.authorName = user.userName;
    response.authorProfileImage = user.profileImage;
    response.contents = comment.contents;
    response.createdAt = String(comment.createdAt);
    return response;
  }
}
