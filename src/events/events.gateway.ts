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

  sendUpdateIndividual(criptoId: number, nuevoRegistro: any) {
    this.server.emit(`historial-update-${criptoId}`, { criptoId, nuevoRegistro });
  }

}
