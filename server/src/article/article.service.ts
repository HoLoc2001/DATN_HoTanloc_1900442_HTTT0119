import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetArticles } from './dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticle(params: GetArticles) {
    const articles = await this.prisma.article.findMany({
      skip: params.offset,
      take: params.limit,
    });
    return articles;
  }
}
