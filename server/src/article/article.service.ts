import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateArticleDto,
  GetArticlesDto,
  AddArticle,
  GetArticlesByUserIdDto,
} from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticle(articleId: number) {
    try {
      const article = await this.prisma.article.update({
        data: {
          views: {
            increment: 1,
          },
        },
        where: {
          id: articleId,
        },
        include: {
          tags: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
      return article;
    } catch (error) {
      throw error;
    }
  }

  async getArticles(params: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        skip: params.offset,
        take: params.limit,

        select: {
          userId: true,
          id: true,
          title: true,
          thumbnail: true,
          tags: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              avatar: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async getAllArticles() {
    try {
      const articles = await this.prisma.article.findMany({
        include: {
          tags: true,
        },
      });
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByUserId(userId: number, params: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { userId: userId },
        skip: params.offset,
        take: params.limit,
        include: {
          tags: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async addArticle(userId: number, dto: AddArticle) {
    try {
      const tagsArr = [];
      dto.tags.forEach((tag) => {
        tagsArr.push({ name: tag });
      });

      const article = await this.prisma.article.create({
        data: {
          title: dto.title,
          content: dto.content,
          userId: userId,
          thumbnail: dto.thumbnail,
          tags: {
            connect: tagsArr,
          },
        },
        include: {
          tags: true,
        },
      });

      return article;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Tag does not exist');
        }
      }
      throw error;
    }
  }

  async updateArticle(
    userId: number,
    articleId: number,
    dto: UpdateArticleDto,
  ) {
    try {
      const article = await this.prisma.article.updateMany({
        data: {
          title: dto.title,
          content: dto.content,
        },
        where: {
          id: articleId,
          userId: userId,
        },
      });

      return article;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(userId: number, articleId: number) {
    try {
      await this.prisma.article.deleteMany({
        where: { id: articleId, userId: userId },
      });
    } catch (error) {}
  }
}
