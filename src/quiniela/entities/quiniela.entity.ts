import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Quiniela extends Document {
  @Prop()
  id: string;

  @Prop({
    isRequired: true,
    unique: true,
    index: true,
  })
  idUser: string;

  @Prop({
    isRequired: true,
  })
  phase: string; // fase de grupos, octavos de final, cuartos de final, semi-finales, tercer puesto y finals

  @Prop({
    isRequired: true,
  })
  prediction: [];
}

export const QuinielaSchema = SchemaFactory.createForClass(Quiniela);
