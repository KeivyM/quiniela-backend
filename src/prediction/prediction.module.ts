import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { Prediction, PredictionSchema } from './entities/prediction.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
  imports: [
    MongooseModule.forFeature([
      { name: Prediction.name, schema: PredictionSchema }, //esto arreglo el error
    ]),
  ],
})
export class PredictionModule {}
