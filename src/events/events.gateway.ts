import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
    },
})

export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    findAll(@MessageBody() data: string): Observable<WsResponse<number>> {
        console.log("data", data)
        return from([1, 2, 3]).pipe(map(item => ({ event: 'message', data: item })));
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }
}