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
        origin: 'http://localhost:3000',
    },
})

export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    findAll(@MessageBody() data: string, @ConnectedSocket() socket: Socket): Observable<WsResponse<number>> {
        socket.join("chat");
        socket.emit('message', data);
        return from([1,2,3]).pipe(map(item => ({ event: 'message', data: item })));
    }
}