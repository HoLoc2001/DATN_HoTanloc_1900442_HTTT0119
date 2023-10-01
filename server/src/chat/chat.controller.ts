import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AccessTokenGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':chatId')
  create(@Param('chatId') id: string, @GetUser() user: User) {
    return this.chatService.getAll(user['userId'], id);
  }

  // @UseGuards(AccessTokenGuard)
  // @Get()
  // findAll(@GetUser() user: User) {
  //   return this.chatService.findAll(user['userId']);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Get(':userId')
  // findOne(@Param('userId') id: string, @GetUser() user: User) {
  //   return this.chatService.findUser(id, user['userId']);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Get(':groupId')
  // finddGroup(@Param('groupId') id: string, @GetUser() user: User) {
  //   return this.chatService.findGroup(id, user['userId']);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Patch(':id')
  // update(
  //   @Param('id') id: any,
  //   @Body() updateChatDto: any,
  //   @GetUser() user: User,
  // ) {
  //   // return this.chatService.updateChat(id, user['userId'], updateChatDto);
  // }

  // @UseGuards(AccessTokenGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string, @GetUser() user: User) {
  //   return this.chatService.remove(+id);
  // }
}
