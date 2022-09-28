import { Module } from '@nestjs/common';
import { QuinielaService } from './quiniela.service';
import { QuinielaController } from './quiniela.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiniela, QuinielaSchema } from './entities/quiniela.entity';
// import { PassportModule } from '@nestjs/passport';
import { PredictionModule } from '../prediction/prediction.module';
import { AuthModule } from '../auth/auth.module';
import {
  Prediction,
  PredictionSchema,
} from '../prediction/entities/prediction.entity';

@Module({
  controllers: [QuinielaController],
  providers: [QuinielaService],
  exports: [QuinielaService],
  imports: [
    PredictionModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Quiniela.name, schema: QuinielaSchema },
      { name: Prediction.name, schema: PredictionSchema }, //esto arreglo el error
    ]),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class QuinielaModule {}
