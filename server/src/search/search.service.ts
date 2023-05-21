import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDto } from './dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  async searchArticles(query: SearchDto) {
    const searchQuery = query.q.trim().replaceAll(/\s+/g, ' | ');

    const result = await this.prisma.article.findMany({
      skip: query.offset,
      take: query.limit,
      where: {
        title: {
          search: searchQuery,
        },
      },
      select: {
        id: true,
        thumbnail: true,
        title: true,
      },
    });
    return result;
  }
}
