import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import axios from 'axios';
import { HistorialModel } from 'src/models/historial.model';
import { CriptomonedaModel } from 'src/models/criptomoneda.model';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class HistorialService {
    private readonly logger = new Logger(HistorialService.name);
    LIMITE_CRIPTO_POR_MINUTO = 30; 
    constructor(
        @Inject('HISTORIAL_REPOSITORY') 
        private historialModel: typeof HistorialModel,
        
        @Inject('CRIPTOMONEDA_REPOSITORY') 
        private criptomonedaModel: typeof CriptomonedaModel,
        private eventsGateway: EventsGateway
    ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async guardarHistorialEnBloques() {
    this.logger.log('Iniciando CronJob para guardar historial (límite: 15 criptos/min)...');

    try {
      const criptomonedas = await this.criptomonedaModel.findAll({
        limit: this.LIMITE_CRIPTO_POR_MINUTO, 
        order: [['updatedAt', 'ASC']], 
      });

      for (const cripto of criptomonedas) {
        await this.guardarHistorialIndividual(cripto.id);
        
        await cripto.update({ updatedAt: new Date() });
      }

      this.eventsGateway.sendUpdate(criptomonedas);
      this.logger.log(`Historial de ${criptomonedas.length} criptomonedas guardado.`);
    } catch (error) {
      this.logger.error('Error en CronJob:', error.message);
    }
  }

  async guardarHistorialIndividual(id: number) {
    try {
      const cripto = await this.criptomonedaModel.findByPk(id);
      if (!cripto) return;

      const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        params: {
          id: cripto.coinMarketCapId, 
          convert: 'MXN',
        },
        headers: {
          'X-CMC_PRO_API_KEY': process.env.API_CRYPTO,
        },
      });

      const data = response.data.data[cripto.coinMarketCapId.toString()];
      if (!data?.quote?.MXN) return;

      await this.historialModel.create({
        criptomonedaId: id,
        precio: data.quote.MXN.price,
        volumen: data.quote.MXN.volume_24h || 0,
        porcentaje: data.quote.MXN.percent_change_24h || 0,
        fecha: new Date(),
      });

    } catch (error) {
      this.logger.error(`Error al guardar historial para cripto ID ${id}:`, error.message);
    }
  }
}