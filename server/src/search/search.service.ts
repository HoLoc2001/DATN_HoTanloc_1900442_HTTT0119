import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  async searchArticles() {
    const result = await this.prisma.article.findMany({
      where: {
        title: {
          search: 'tutorial | Kubernetes',
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
