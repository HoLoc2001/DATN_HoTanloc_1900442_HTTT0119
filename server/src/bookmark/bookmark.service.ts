import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetBookmarksDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookmarks(userId: number, query: GetBookmarksDto) {
    try {
      let articles = await this.prisma.bookmark.findMany({
        select: {
          userId: true,
          Article: {
            select: {
              id: true,
              title: true,
              views: true,
              thumbnail: true,
              tags: true,
              likes: {
                where: {
                  userId: userId,
                },
              },
              _count: {
                select: {
                  likes: true,
                  comments: true,
                },
              },
              user: {
                select: {
                  id: true,
                  avatar: true,
                  firstName: true,
                  lastName: true,
                },
              },
              createdAt: true,
            },
          },
        },
        skip: query.offset,
        take: query.limit,

        where: {
          userId: userId,
        },
      });

      const Articles = articles?.map((article) => {
        article.Article['isBookmarked'] =
          userId === article.userId ? true : false;
        article.Article['isLiked'] =
          article.Article.likes.length === 1 ? true : false;
        return { ...article.Article };
      });

      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async addBookmark(userId: number, articleId: number) {
    try {
      const article = await this.prisma.bookmark.create({
        data: {
          articleId: articleId,
          userId: userId,
        },
        select: {
          Article: {
            select: {
              id: true,
              views: true,
              title: true,
              thumbnail: true,
              tags: true,
              likes: {
                where: {
                  userId: userId,
                },
              },
              _count: {
                select: {
                  likes: true,
                  comments: true,
                },
              },
              user: {
                select: {
                  id: true,
                  avatar: true,
                  firstName: true,
                  lastName: true,
                },
              },
              createdAt: true,
            },
          },
        },
      });
      article.Article['isBookmarked'] = true;
      article.Article['isLiked'] =
        article.Article.likes.length === 1 ? true : false;

      return article.Article;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Article does exist');
        }
      }
      throw error;
    }
  }

  async deleteBookmark(userId: number, articleId: number) {
    try {
      const article = await this.prisma.bookmark.delete({
        where: {
          userId_articleId: {
            articleId: articleId,
            userId: userId,
          },
        },
      });
      return article;
    } catch (error) {
      throw error;
    }
  }
}
