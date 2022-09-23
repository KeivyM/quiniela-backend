import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Quiniela',
  // })
  // quiniela: string[];

  @Prop()
  quiniela: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
