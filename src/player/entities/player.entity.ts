import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/entities/user.entity';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop()
  id: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  goals: number;
}
export const PlayerSchema = SchemaFactory.createForClass(Player);
