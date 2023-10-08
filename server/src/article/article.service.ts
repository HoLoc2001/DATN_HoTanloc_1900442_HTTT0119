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

  async getArticleAuth(articleId: number, userId: number) {
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
        select: {
          userId: true,
          id: true,
          title: true,
          thumbnail: true,
          views: true,
          content: true,
          tags: true,
          chude: true,
          files: true,
          createdAt: true,
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

      article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
      article['isLiked'] = article.likes.length === 1 ? true : false;

      return article;
    } catch (error) {
      throw error;
    }
  }

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
        select: {
          userId: true,
          id: true,
          title: true,
          thumbnail: true,
          views: true,
          content: true,
          tags: true,
          createdAt: true,

          files: true,

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
      return article;
    } catch (error) {
      throw error;
    }
  }

  async getArticlesAuth(query: GetArticlesDto, userId: number) {
    try {
      const articles = await this.prisma.article.findMany({
        skip: query.offset,
        take: query.limit,

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
          chude: true,
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
        orderBy: {
          createdAt: 'desc',
        },
      });

      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getArticles(query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        skip: query.offset,
        take: query.limit,

        select: {
          userId: true,
          id: true,
          title: true,
          views: true,
          chude: true,
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
        orderBy: {
          createdAt: 'desc',
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

  async getMyArticles(userId: number, query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { userId: userId },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
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
      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getTuyendung(userId: number, query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { chude: 'TUYENDUNG' },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
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
          files: true,
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
      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getHoidap(userId: number, query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { chude: 'CAUHOI' },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
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
          chude: true,
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
      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getTintuc(userId: number, query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { chude: 'TINTUC' },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
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
      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByUserIdAuth(
    userId: number,
    myUserId: number,
    query: GetArticlesDto,
  ) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { userId: userId },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          bookmarks: {
            where: {
              userId: myUserId,
            },
          },
          likes: {
            where: {
              userId: myUserId,
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
      const Articles = articles?.map((article) => {
        article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
        article['isLiked'] = article.likes.length === 1 ? true : false;
        return { ...article };
      });
      return Articles;
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByUserId(userId: number, query: GetArticlesDto) {
    try {
      const articles = await this.prisma.article.findMany({
        where: { userId: userId },
        skip: query.offset,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
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
      return articles;
    } catch (error) {
      throw error;
    }
  }

  async addArticle(userId: number, dto: any) {
    try {
      const tagsArr = [];
      // dto.tags.forEach((tag) => {
      //   tagsArr.push({ name: tag });
      // });
      console.log(
        '---------------------------------',
        dto,
        '---------------------------------',
      );
      console.log(dto?.files);

      const article = await this.prisma.article.create({
        data: {
          title: dto.title,
          content: dto.content,
          userId: userId,
          thumbnail: dto.thumbnail,
          chude: dto.chude,
          files: (dto?.files).toString(),

          //   connect: tagsArr,
          // },dto?.files,
          // tags: {
          //   connect: tagsArr,
          // },
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
          // tags: true,
          views: true,
          chude: true,
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
      article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
      article['isLiked'] = article.likes.length === 1 ? true : false;

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

  async updateArticle(userId: number, articleId: number, dto: any) {
    try {
      const hasArticle = await this.prisma.article.findMany({
        where: {
          id: articleId,
          userId: userId,
        },
      });
      if (!hasArticle) {
        throw new ForbiddenException();
      }
      const article = await this.prisma.article.update({
        data: {
          title: dto.title,
          content: dto.content,
          thumbnail: dto.thumbnail,
          chude: dto.chude,
        },
        where: {
          id: articleId,
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

      console.log(article);

      article['isBookmarked'] = article.bookmarks.length === 1 ? true : false;
      article['isLiked'] = article.likes.length === 1 ? true : false;

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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
