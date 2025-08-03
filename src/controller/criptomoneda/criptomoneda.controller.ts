import { Controller, Get, Param } from '@nestjs/common';
import { CriptomonedaService } from 'src/services/criptomoneda/criptomoneda.service';

@Controller('criptomoneda')
export class CriptomonedaController {

    constructor(private readonly criptomonedaService: CriptomonedaService){}

    @Get('all')
    async getAllCriptos() {
        return this.criptomonedaService.getAllCriptos();
    }

}
