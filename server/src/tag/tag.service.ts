import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
    });
    console.log(tag);
    return tag;
  }
}
