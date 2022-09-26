import { IsArray, IsString } from 'class-validator';

export class CreateQuinielaDto {
  // @IsString()
  // readonly userId: string;

  @IsString()
  readonly phase: string;

  @IsArray()
  predictions: Object[];
}
