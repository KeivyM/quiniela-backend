import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({
    index: true,
  })
  name: string;

  @Prop({
    index: true,
  })
  lastName: string;

  @Prop({
    unique: true,
    index: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    index: true,
  })
  password: string;

  @Prop({
    unique: true,
    index: true,
  })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
