import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateQuinielaDto {
  @IsString()
  readonly user?: string;

  @IsString()
  readonly phase: string;

  @IsArray()
  prediction: string[];
}
