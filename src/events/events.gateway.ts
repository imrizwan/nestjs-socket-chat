import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    ConnectedSocket
} from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://172.16.25.31:3000',
    }
})

export class EventsGateway {
    @WebSocketServer()
    server: Server;

    // @SubscribeMessage('message')
    // findAll(@MessageBody() data: string, @ConnectedSocket() socket: Socket): Observable<WsResponse<number>> {
    //     socket.emit('message', data);
    //     return from([1,2,3]).pipe(map(item => ({ event: 'message', data: item })));
    // }

    @SubscribeMessage('message')
    async identity(@MessageBody() data: number, @ConnectedSocket() socket: Socket): Promise<number> {
        socket.broadcast.emit('message', data);
        return data;
    }
}