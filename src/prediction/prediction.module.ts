import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { Prediction, PredictionSchema } from './entities/prediction.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/entities/user.entity';
import { Quiniela, QuinielaSchema } from '../quiniela/entities/quiniela.entity';
import { Player, PlayerSchema } from '../player/entities/player.entity';

@Module({
  controllers: [PredictionController],
  providers: [PredictionService],
  exports: [PredictionService],
  imports: [
    MongooseModule.forFeature([
      { name: Prediction.name, schema: PredictionSchema },
      { name: User.name, schema: UserSchema },
      { name: Quiniela.name, schema: QuinielaSchema },
      { name: Player.name, schema: PlayerSchema },
    ]),
    AuthModule,
    HttpModule,
  ],
})
export class PredictionModule {}
