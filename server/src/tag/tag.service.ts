import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTagDto, GetTagDto } from './dto';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { EventGateway } from 'src/event.gateway';
const nodemailer = require('nodemailer');
const { OAuth2Client, auth } = require('google-auth-library');

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventGateway: EventGateway,
  ) {}
  async getTags() {
    const tags = await this.prisma.tag.findMany();
    return tags;
  }

  async getMail(mail) {
    const myOAuth2Client = new OAuth2Client(
      '731517167807-gcur42co6quvj04cmogpcnpivc7s9djs.apps.googleusercontent.com',
      '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',
    );
    myOAuth2Client.setCredentials({
      refresh_token:
        '1//04xSnYmUy7522CgYIARAAGAQSNwF-L9IrfpnhEnr-s5f_CvlZYfDsGu_oGXbfxfbJvi-xjjKDwLjMasKW4bau9k097H5SpaPMFoQ',
    });
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'holoc436@gmail.com',
        clientId:
          '731517167807-gcur42co6quvj04cmogpcnpivc7s9djs.apps.googleusercontent.com',
        clientSecret: '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',
        refresh_token:
          '1//04xSnYmUy7522CgYIARAAGAQSNwF-L9IrfpnhEnr-s5f_CvlZYfDsGu_oGXbfxfbJvi-xjjKDwLjMasKW4bau9k097H5SpaPMFoQ',
        accessToken: myAccessToken,
      },
    });
    console.log(mail);

    const mailOptions = {
      to: mail, // Gửi đến ai?
      subject: 'Thông Báo Về Việc Cấm Đăng Bài', // Tiêu đề email
      html: `Kính gửi ${mail},

      Chúng tôi rất tiếc phải thông báo rằng tài khoản của bạn tại Website chia sẻ kiến thức học tập đã bị cấm đăng bài và bình luận`, // Nội dung email
    };
    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);
  }

  async addFile(data: any, userId: number) {
    // console.log(data);
    // const tags = await axios({
    //   method: 'POST',
    //   url: `${process.env.DIRECTUS_URL}/files`,
    //   data: data,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    const ab = await this.prisma.comment.create({
      data: {
        file: data.data.data.id,
        articleId: data.articleId,
        userId: userId,
        content: 'dasd',
      },
      include: {
        user: {
          select: {
            avatar: true,
            firstName: true,
            lastName: true,
          },
        },
        directus_files: {
          select: {
            title: true,
          },
        },
      },
    });

    this.eventGateway.handleEmitSocket(
      {
        articleId: data.articleId,
      },
      'comment',
      null,
    );
    console.log(data);
    return ab;
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
