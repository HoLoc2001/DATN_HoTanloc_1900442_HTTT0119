import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPassword, EditUser } from './dto';
import { fail } from 'assert';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        firstName: true,
        lastName: true,
        ban: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            followings: true,
          },
        },
      },
    });
    return user;
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        ban: true,
        avatar: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    return user;
  }

  async editUser(userId: number, dto: EditUser) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: dto.avatar,
        lastName: dto.lastName,
        firstName: dto.firstName,
      },
    });

    return user;
  }

  async editPassword(userId: number, dto: EditPassword) {
    const { password } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    const pwMatches = await argon.verify(password, dto.oldPassword);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    const hashPass = await argon.hash(dto.oldPassword);

    await this.prisma.user.update({
      data: {
        password: hashPass,
      },
      where: {
        id: userId,
      },
    });

    return { success: true };
  }

  async follow(userId: number, followingId: number) {
    const hasFollow = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    if (hasFollow) {
      await this.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: followingId,
          },
        },
      });

      return { userId: userId, isFollowed: false };
    } else {
      await this.prisma.follows.create({
        data: {
          followerId: userId,
          followingId: followingId,
        },
      });

      return { userId: userId, isFollowed: true };
    }
  }

  async getHasFollow(userId: number, followingId: number) {
    const hasFollow = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });

    if (hasFollow) {
      return { userId, isFollowed: true };
    }
    return { userId, isFollowed: false };
  }

  async getFollowers(userId: number) {
    const followers = await this.prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        followers: {
          select: {
            followerId: true,
            follower: {
              select: {
                id: true,
                avatar: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return followers;
  }

  async getFollowings(userId: number) {
    // const {
    //   [0]: { followings },
    // } = await this.prisma.user.findMany({
    //   where: {
    //     id: userId,
    //   },
    //   select: {
    //     followings: {
    //       select: {
    //         following: {
    //           select: {
    //             id: true,
    //             avatar: true,
    //             firstName: true,
    //             lastName: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const followings = await this.prisma.follows.findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            avatar: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return followings;
  }
}
