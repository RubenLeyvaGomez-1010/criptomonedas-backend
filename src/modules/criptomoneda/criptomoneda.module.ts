import { Module } from '@nestjs/common';
import { CriptomonedaController } from 'src/controller/criptomoneda/criptomoneda.controller';
import { CriptomonedaService } from 'src/services/criptomoneda/criptomoneda.service';

@Module({
    imports: [],
    controllers: [CriptomonedaController],
    providers: [CriptomonedaService],
})
export class CriptomonedaModule {}
