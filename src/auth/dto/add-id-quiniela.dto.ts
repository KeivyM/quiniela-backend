import { IsString } from 'class-validator';

export class AddIdQuinielaDto {
  @IsString()
  readonly id: string;
}
