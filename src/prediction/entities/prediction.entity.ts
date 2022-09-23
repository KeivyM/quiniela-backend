import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/entities/user.entity';
import { Quiniela } from 'src/quiniela/entities/quiniela.entity';

@Schema()
export class Prediction extends Document {
  @Prop()
  id: string;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiniela',
  })
  quiniela: Quiniela;

  @Prop({
    required: true,
  })
  idPartido: string; // cambiar nombre, verificar si hay un endpoint en la api que obtenga cada partido

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
