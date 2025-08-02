import { Module } from '@nestjs/common';
import { HistorialController } from 'src/controller/historial/historial.controller';
import { HistorialService } from 'src/services/historial/historial.service';

@Module({
    imports: [],
    controllers: [HistorialController],
    providers: [HistorialService]
})
export class HistorialModule {}
