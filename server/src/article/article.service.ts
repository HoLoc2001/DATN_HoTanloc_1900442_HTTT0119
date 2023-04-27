import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateArticleDto,
  GetArticlesDto,
  GetArticleById,
  AddArticle,
} from './dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticle(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        tags: true,
      },
    });
    return article;
  }

  async getArticles(params: GetArticlesDto) {
    const articles = await this.prisma.article.findMany({
      skip: params.offset,
      take: params.limit,
      include: {
        tags: true,
      },
    });
    return articles;
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
          userId,
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
      return error;
    }
  }

  async updateArticle(
    userId: number,
    articleId: number,
    dto: UpdateArticleDto,
  ) {
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
  }
}
