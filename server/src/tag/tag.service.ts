import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTagDto, GetTagDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async getTags() {
    const tags = await this.prisma.tag.findMany();
    return tags;
  }

  async getMyTags(userId: number) {
    const tags = await this.prisma.tag.findMany();
    const { tags: myTags } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        tags: true,
      },
    });
    tags.forEach((tag) => {
      tag['isFollowed'] = false;
      myTags.forEach((myTag) => {
        if (myTag.name === tag.name) {
          tag['isFollowed'] = true;
        }
      });
    });

    // myTags.forEach((tag) => {
    //   tag['isFollowed'] = true;
    // });

    return tags;
  }

  async getPopularTags() {
    const tags = await this.prisma.tag.findMany({
      orderBy: {
        articles: {
          _count: 'desc',
        },
      },
      take: 10,
    });
    return tags;
  }

  async getTagById(name: string, query: GetTagDto) {
    const tag = await this.prisma.tag.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      include: {
        articles: {
          skip: query.offset,
          take: query.limit,
          include: {
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
        },
      },
    });

    return tag;
  }

  async addTag(dto: AddTagDto) {
    try {
      const tag = await this.prisma.tag.create({
        data: {
          name: dto.name,
        },
      });

      return tag;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Tag already exists');
        }
      }
      throw error;
    }
  }

  async addMyTag(userId: number, tag: string) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          tags: {
            connect: [{ name: tag }],
          },
        },
      });

      return tag;
    } catch (error) {
      throw error;
    }
  }

  async removeMyTag(userId: number, tag: string) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          tags: {
            disconnect: [{ name: tag }],
          },
        },
      });

      return tag;
    } catch (error) {
      throw error;
    }
  }
}
