import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { CriptomonedaModel } from 'src/models/criptomoneda.model';
import { HistorialModel } from 'src/models/historial.model';

dotenv.config();

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      sequelize.addModels([
        CriptomonedaModel,
        HistorialModel,
      ]);
       await sequelize.sync();
      return sequelize;
    },
  },
  {
    provide: 'CRIPTOMONEDA_REPOSITORY',
    useValue: CriptomonedaModel,
    
  },

  {
    provide: 'HISTORIAL_REPOSITORY',
    useValue: HistorialModel,

  },

];

let sequlizeModule = SequelizeModule.forRootAsync({
  useFactory: async () => {
    return {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [], 
      autoLoadModels: true,
      synchronize: true, 
    };
  },
});

@Global()
@Module({
  imports: [sequlizeModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders, sequlizeModule],
})
export class CommonModule {}