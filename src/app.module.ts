import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuinielaModule } from './quiniela/quiniela.module';
import { PredictionModule } from './prediction/prediction.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/quinielaApp'),
    ScheduleModule.forRoot(),
    AuthModule,
    QuinielaModule,
    PredictionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
