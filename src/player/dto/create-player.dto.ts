import { IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsNumber()
  goals: number;
}
