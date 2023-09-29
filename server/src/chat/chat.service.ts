import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll(userId: any) {
    try {
      let chats = await this.prisma.chat.findMany({
        where: {
          user: userId,
        },
      });
      return chats;
    } catch (error) {}
  }

  async findAll(userId: any) {
    const result = await this.prisma.chat.findMany({
      where: {
        users_chat_userTousers: userId,
      },
    });
    return result;
  }

  async findUser(id: any, userId: any) {
    const result = await this.prisma.chat.findMany({
      where: {
        AND: [
          { users_chat_userTousers: userId },
          { users_chat_to_userTousers: id },
        ],
      },
    });
    return result;
  }

  async findGroup(id: any, userId: any) {
    const result = await this.prisma.chat.findMany({
      where: {
        AND: [{ users_chat_userTousers: userId }, { group_id: id }],
      },
    });
    return result;
  }

  async updateChatUser(id: any, userId: any, updateChatDto: any) {
    // const result = await this.prisma.chat.updateMany({
    //   where: {
    //     AND: [{ users_chat_userTousers: userId }, { group_id: id }],
    //   },
    // });
    // return result;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
