import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  
  sendUpdate(data: any) {
    this.server.emit('cronUpdate', data);
  }
}
