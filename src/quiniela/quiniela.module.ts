import { Module } from '@nestjs/common';
import { QuinielaService } from './quiniela.service';
import { QuinielaController } from './quiniela.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiniela, QuinielaSchema } from './entities/quiniela.entity';
import { PredictionModule } from '../prediction/prediction.module';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/entities/user.entity';
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
      { name: Prediction.name, schema: PredictionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class QuinielaModule {}
