import { Controller, Get, Param } from '@nestjs/common';
import { HistorialService } from 'src/services/historial/historial.service';

@Controller('historial')
export class HistorialController {

    constructor(private readonly historialService: HistorialService){}

    @Get(':id')
        getHistorial(@Param('id') id: number) {
        return this.historialService.guardarHistorialIndividual(id);
    }
}
