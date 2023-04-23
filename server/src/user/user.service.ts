import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPassword, EditUser } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUser) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
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
}
