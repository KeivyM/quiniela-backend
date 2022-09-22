import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop()
  id: string;

  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
  })
  lastName: string;

  @Prop({
    unique: true,
    index: true,
    isRequired: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
    isRequired: true,
  })
  email: string;

  @Prop({
    index: false,
    isRequired: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
