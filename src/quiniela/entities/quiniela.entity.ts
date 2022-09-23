import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/entities/user.entity';

@Schema()
export class Quiniela extends Document {
  @Prop()
  id: string;

  @Prop({
    required: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    required: true,
  })
  phase: string; // fase de grupos, octavos de final, cuartos de final, semi-finales, tercer puesto y finals

  @Prop({
    required: true,
  })
  prediction: string[];
}

export const QuinielaSchema = SchemaFactory.createForClass(Quiniela);
