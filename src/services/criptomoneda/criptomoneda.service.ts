import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getCriptomoneda, getHistorial } from 'src/helpers/coin';
import { CriptomonedaModel } from 'src/models/criptomoneda.model';

@Injectable()
export class CriptomonedaService {

    constructor(@Inject('CRIPTOMONEDA_REPOSITORY') private criptomonedaModel: typeof CriptomonedaModel){}

    // async findOrCreate(nombre: string, simbolo: string) {
    //     const [cripto] = await this.criptomonedaModel.findOrCreate({
    //     where: { simbolo },
    //     defaults: { nombre, simbolo },
    //     });

    //     return cripto;
    // }


    async getAllCriptos(){

        const criptomonedas = await getCriptomoneda();

        if(!criptomonedas || criptomonedas.length === 0) throw new NotFoundException('No se encontraron criptomonedas');

        const criptos = criptomonedas.map(cripto => ({
            nombre: cripto.name,
            simbolo: cripto.symbol,
            coinMarketCapId: cripto.id,
        }));
        
        const save = await this.criptomonedaModel.bulkCreate(criptos, {
            updateOnDuplicate: ['coinMarketCapId','nombre', 'simbolo'],
            
        });

        if(!save) throw new NotFoundException('Error al obtener las criptomonedas');

        return save;
    }

    // async getHistorial(simbolo: string){
    //     const criptos = await getHistorial(simbolo)
    //     return criptos;
    // }
}
