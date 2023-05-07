import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTagDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  async getTags() {
    const tags = await this.prisma.tag.findMany();
    return tags;
  }

  async getTagById(name: string) {
    const tag = await this.prisma.tag.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      include: {
        articles: {
          skip: 2,
          take: 2,
          include: {
            tags: true,
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
}
