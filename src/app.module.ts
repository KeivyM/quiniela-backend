import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuinielaModule } from './quiniela/quiniela.module';
import { PredictionModule } from './prediction/prediction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';

//mongodb+srv://mern_user:DYPiFDj4iPDXLznM@cluster0.frmzguy.mongodb.net/Cluster0?authSource=admin&replicaSet=atlas-95y0us-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
//mongodb://localhost:27017/quinielaApp

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mern_user:DYPiFDj4iPDXLznM@cluster0.frmzguy.mongodb.net/Cluster0?authSource=admin&replicaSet=atlas-95y0us-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    ),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    QuinielaModule,
    PredictionModule,
    PlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
