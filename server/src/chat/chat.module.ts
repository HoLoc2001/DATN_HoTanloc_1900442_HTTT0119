import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { EventGateway } from 'src/event.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, EventGateway],
})
export class ChatModule {}
