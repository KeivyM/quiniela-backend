import { IsObject, IsString } from 'class-validator';

export class CreatePredictionDto {
  @IsString()
  readonly matchId: string; // id del partido

  @IsString()
  readonly userId: string; // opcional

  @IsObject()
  results: {
    homeScore: string;
    awayScore: string;
  };
}
