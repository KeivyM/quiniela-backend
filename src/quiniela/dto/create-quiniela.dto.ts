import { IsArray, IsString } from 'class-validator';

export class CreateQuinielaDto {
  @IsString()
  readonly phase: string;

  @IsArray()
  predictions: Object[];
}
