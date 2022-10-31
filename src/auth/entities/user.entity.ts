import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop()
  id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  email: string;

  @Prop({
    index: false,
    required: true,
  })
  password: string;

  @Prop()
  quiniela: [];

  @Prop()
  points: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
