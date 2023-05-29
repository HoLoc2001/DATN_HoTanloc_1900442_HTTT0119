import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDto } from './dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}
  async searchArticlesAuth(query: SearchDto, userId: number) {
    const searchQuery = query.q.trim().replaceAll(/\s+/g, ' | ');

    const articles = await this.prisma.article.findMany({
      skip: query.offset,
      take: query.limit,
      where: {
        title: {
          search: searchQuery,
        },
      },
      select: {
        bookmarks: {
          where: {
            userId: userId,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
        },
        userId: true,
        id: true,
        title: true,
        thumbnail: true,
        tags: true,
        views: true,

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

    const Articles = articles.map((article) => {
      article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
      article['isLiked'] = article.likes.length === 1 ? true : false;
      return { ...article };
    });

    return Articles;
  }

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
        userId: true,
        id: true,
        title: true,
        thumbnail: true,
        tags: true,
        views: true,

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
    return result;
  }

  async searchUser(query: SearchDto) {
    const searchQuery = query.q.trim().replaceAll(/\s+/g, ' | ');

    const result = await this.prisma.user.findMany({
      skip: query.offset,
      take: query.limit,
      where: {
        firstName: {
          search: searchQuery,
        },
        lastName: {
          search: searchQuery,
        },
      },
    });
    return result;
  }
}
