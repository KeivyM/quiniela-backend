import { IsNumber, IsString } from 'class-validator';

export class AddPointsDto {
  @IsString()
  readonly userId: string;

  @IsNumber()
  readonly points: number;
}
