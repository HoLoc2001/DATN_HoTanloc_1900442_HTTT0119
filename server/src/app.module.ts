import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArticlesModule } from './article/article.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';
import { CommentModule } from './comment/comment.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    UserModule,
    ArticlesModule,
    PrismaModule,
    CloudinaryModule,
    TagModule,
    LikeModule,
    SearchModule,
    CommentModule,
    BookmarkModule,
  ],
})
export class AppModule {}
