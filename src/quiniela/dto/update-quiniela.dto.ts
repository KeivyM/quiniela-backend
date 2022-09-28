import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
import { CreateQuinielaDto } from './create-quiniela.dto';

export class UpdateQuinielaDto extends PartialType(CreateQuinielaDto) {
  @IsString()
  readonly phase: string;

  @IsArray()
  predictions: {
    matchId: string;
    results: { homeScore: number; awayScore: number };
  }[];
}
