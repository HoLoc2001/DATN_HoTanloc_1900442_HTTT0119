import { Injectable } from '@nestjs/common';
import { EventGateway } from 'src/event.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventGateway: EventGateway,
  ) {}

  async getLikesByArticleId(articleId: number) {
    try {
      const {
        Article: {
          _count: { likes },
        },
      } = await this.prisma.like.findFirst({
        where: {
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

        this.eventGateway.handleEmitSocket(
          {
            articleId: articleId,
          },
          'like',
          null,
        );

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
        this.eventGateway.handleEmitSocket(
          {
            articleId: articleId,
          },
          'like',
          null,
        );

        return { isLiked: true, likes };
      }
    } catch (error) {
      throw error;
    }
  }
}
