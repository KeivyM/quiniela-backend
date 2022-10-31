import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Quiniela } from '../../quiniela/entities/quiniela.entity';

@Schema()
export class Prediction extends Document {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiniela',
  })
  quiniela: Quiniela;

  @Prop({
    required: true,
    index: true,
  })
  matchId: string;

  @Prop({
    required: true,
    type: Object,
  })
  results: {
    homeScore: string;
    awayScore: string;
  };
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
