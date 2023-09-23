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
    console.log('connect', socket.id);

    socket.on('addUser', async (userId) => {
      console.log('user_id' + userId);
      if (userId) {
        // this.addUser(userId, socket.id);
      }
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

  // async addUser(user_id, socket_id) {
  //   try {
  //     const user_socket = await this.prisma.user_socket_ids.findFirst({
  //       where: {
  //         user_id: user_id,
  //       },
  //     });

  //     if (user_socket) {
  //       return await this.prisma.user_socket_ids.updateMany({
  //         where: { user_id: user_id },
  //         data: {
  //           socket_id: socket_id,
  //         },
  //       });
  //     }
  //     return await this.prisma.user_socket_ids.create({
  //       data: {
  //         user_id: user_id,
  //         socket_id: socket_id,
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  removeUser(socketId) {
    users = users.filter((user) => user.socketId !== socketId);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // console.log('disconnect', socket.id, socket.data?.email);
  }
}
