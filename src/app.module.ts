import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { CriptoModule } from './modules/cripto/cripto.module';
import { HistorialModule } from './modules/historial/historial.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CommonModule, 
    CriptoModule, 
    HistorialModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule
  ],
  controllers: [AppController,],
  providers: [AppService,
    HttpModule,
  ],
})
export class AppModule {}
