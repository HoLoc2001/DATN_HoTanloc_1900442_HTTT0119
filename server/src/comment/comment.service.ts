import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommentsByArticleId(articleId: number) {
    try {
      const listComment = await this.prisma.comment.findMany({
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

      return listComment;
    } catch (error) {
      throw error;
    }
  }

  async addComment(articleId: number, content: string, userId: number) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          content: content,
          articleId: articleId,
          userId: userId,
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

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(commentId: number, content: string, userId: number) {
    try {
      const { count } = await this.prisma.comment.updateMany({
        data: {
          content: content,
        },
        where: {
          id: commentId,
          userId: userId,
        },
      });
      let comment;
      if (count) {
        comment = await this.prisma.comment.findUnique({
          where: {
            id: commentId,
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
      }

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: number, userId: number) {
    try {
      const comment = await this.prisma.comment.deleteMany({
        where: {
          id: commentId,
          userId: userId,
        },
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }
}
