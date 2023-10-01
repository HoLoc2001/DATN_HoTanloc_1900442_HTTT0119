import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { AuthService } from './user/services/auth.service';
// import { AuthenticatorJwtService } from './authenticator-jwt/authenticator-jwt.service';
let users = [];
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['content-type'],
    credentials: true,
  },
})
@Injectable()
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly prisma: PrismaService) {}
  handleEmitSocket(data, event, to) {
    if (to) {
      this.server.to(to).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    console.log('message', data, socket.id);
    setTimeout(() => {
      this.server.to(socket.data.email + '1').emit('message', data);
    }, 1000);
  }

  afterInit(socket: Socket): any {}

  async handleConnection(socket: Socket) {
    // console.log('connect', socket.id);

    socket.on('addUser', async (userId) => {
      console.log('user_id' + userId);
      if (userId) {
        this.addUser(userId, socket.id);
      }
      console.log(123123);
      this.server.emit('getUsers', users);
    });

    socket.on('event', (data) => {
      /* … */
    });
    socket.on('disconnect', () => {
      /* … */
      console.log('user disconnected');
      this.removeUser(socket.id);
      this.server.emit('getUsers', users);
    });
  }

  async addUser(user_id, socket_id) {
    try {
      return await axios.patch(
        `https://lv-directus.hotanloc.xyz/items/users/${user_id}`,
        {
          socket_id: socket_id,
        },
      );
    } catch (e) {
      console.log(e);
    }
  }

  removeUser(socketId) {
    users = users.filter((user) => user.socketId !== socketId);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // console.log('disconnect', socket.id, socket.data?.email);
  }
}
