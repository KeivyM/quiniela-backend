import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateQuinielaDto {
  @IsString()
  readonly idUser: string;

  @IsString()
  readonly phase: string;

  @IsArray()
  readonly prediction: [];
}
