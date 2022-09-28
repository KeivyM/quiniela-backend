import { IsString } from 'class-validator';

export class FindQuinielaDto {
  @IsString()
  readonly phase: string;

  @IsString()
  userId: string;
}
