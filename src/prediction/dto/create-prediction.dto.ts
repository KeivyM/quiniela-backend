import { IsObject, IsString } from 'class-validator';

export class CreatePredictionDto {
  @IsString()
  readonly matchId: string; // id del partido

  @IsString()
  readonly userId: string;

  @IsObject()
  results: {
    homeScore: string;
    awayScore: string;
  };
}
