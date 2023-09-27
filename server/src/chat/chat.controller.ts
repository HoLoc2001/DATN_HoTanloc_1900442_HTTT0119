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

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createChatDto: any, @GetUser() user: User) {
    return this.chatService.getAll(user['userId']);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@GetUser() user: User) {
    return this.chatService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':userId')
  findOne(@Param('userId') id: string, @GetUser() user: User) {
    return this.chatService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':groupId')
  finddGroup(@Param('groupId') id: string, @GetUser() user: User) {
    return this.chatService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatDto: any,
    @GetUser() user: User,
  ) {
    return this.chatService.update(+id, updateChatDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.chatService.remove(+id);
  }
}
