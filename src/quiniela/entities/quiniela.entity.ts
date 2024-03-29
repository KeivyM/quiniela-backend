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
  userId: User;

  @Prop({
    required: true,
    index: true,
  })
  phase: string;

  @Prop({
    required: true,
  })
  prediction: [];
}

export const QuinielaSchema = SchemaFactory.createForClass(Quiniela);
