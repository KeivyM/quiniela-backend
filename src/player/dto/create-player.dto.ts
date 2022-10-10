import { IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  playerName: string;

  @IsNumber()
  goals: number;
}
