import { IsObject, IsString } from 'class-validator';
export class CreatePredictionDto {
  @IsString()
  readonly matchId?: string;

  @IsString()
  readonly userId?: string;

  @IsObject()
  results?: {
    homeScore: string;
    awayScore: string;
  };
}
