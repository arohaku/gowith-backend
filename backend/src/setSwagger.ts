import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseEntity } from '@common/response-entity';
import { AuthModule } from '@app/auth/auth.module';
import { ImageModule } from '@app/image/image.module';
import { GroupArticleModule } from '@app/group-article/group-article.module';
import { UserModule } from '@app/user/user.module';
import { MyInfoModule } from '@app/myinfo/myinfo.module';
import { GroupApplicationModule } from '@app/group-application/group-application.module';
import { NotificationModule } from '@app/notification/notification.module';
import { CommentModule } from '@app/comment/comment.module';

export const setSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('고윗 REST API Specification')
    .setVersion('1.0.0')
    .addServer(`http://localhost`)
    .addServer('https://api.gowith.store')
    .addCookieAuth(
      'access_token',
      { type: 'apiKey', in: 'cookie' },
      'cookieAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AuthModule,
      ImageModule,
      GroupArticleModule,
      UserModule,
      MyInfoModule,
      GroupApplicationModule,
      NotificationModule,
      CommentModule,
    ],
    extraModels: [ResponseEntity],
  });

  SwaggerModule.setup('/v1/docs', app, document, {
    swaggerOptions: {
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = [
          'post',
          'put',
          'patch',
          'get',
          'delete',
          'options',
          'trace',
        ];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      },
    },
  });
};
