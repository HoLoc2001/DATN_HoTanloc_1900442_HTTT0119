import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    try {
      const articles = await this.prisma.bookmark.findMany({
        select: {
          userId: true,
          Article: {
            select: {
              id: true,
              title: true,
              thumbnail: true,
              tags: true,
              _count: {
                select: {
                  likes: true,
                  comments: true,
                },
              },
              createdAt: true,
            },
          },
        },

        where: {
          userId: userId,
        },

        // include: {
        //   Article: {
        //     include: {
        //       tags: true,
        //     },
        //   },
        // },
      });
      return articles;
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
        include: {
          Article: {
            include: {
              tags: true,
            },
          },
        },
      });
      return article;
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
