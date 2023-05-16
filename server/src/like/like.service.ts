import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async getLikesByArticleId(articleId: number) {
    try {
      const listLike = await this.prisma.like.findMany({
        where: {
          articleId: articleId,
        },

        include: {
          user: {
            select: {
              avatar: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return listLike;
    } catch (error) {
      throw error;
    }
  }

  async updateLikeByArticleId(articleId: number, userId: number) {
    try {
      const hasLike = await this.prisma.like.findUnique({
        where: {
          userId_articleId: {
            userId: userId,
            articleId: articleId,
          },
        },
      });

      if (hasLike) {
        const {
          Article: {
            _count: { likes },
          },
        } = await this.prisma.like.delete({
          where: {
            userId_articleId: {
              userId: userId,
              articleId: articleId,
            },
          },
          select: {
            Article: {
              select: {
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
          },
        });

        return { isLiked: false, likes: likes - 1 };
      } else {
        const {
          Article: {
            _count: { likes },
          },
        } = await this.prisma.like.create({
          data: {
            userId: userId,
            articleId: articleId,
          },
          select: {
            Article: {
              select: {
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
          },
        });

        return { isLiked: true, likes };
      }
    } catch (error) {
      throw error;
    }
  }
}
