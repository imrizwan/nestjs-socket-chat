import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
import { Message } from '../database/entities/message/message.entity';
@WebSocketGateway({
  cors: {
    origin: process.env.origin,
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject(MessageService)
    private readonly messageService: MessageService,
  ) {}

  @SubscribeMessage('message')
  async identity(
    @MessageBody() data: Message,
    @ConnectedSocket() socket: Socket,
  ): Promise<Message> {
    socket.broadcast.emit('message', data);
    await this.messageService.addMessage(data);
    return data;
  }
}
