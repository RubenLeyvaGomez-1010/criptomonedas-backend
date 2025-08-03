import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HistorialController } from 'src/controller/historial/historial.controller';
import { EventsGateway } from 'src/events/events.gateway';
import { HistorialService } from 'src/services/historial/historial.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
    ],
    controllers: [HistorialController],
    providers: [HistorialService, EventsGateway]
})
export class HistorialModule {}
