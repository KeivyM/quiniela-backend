import { IsString } from 'class-validator';

export class FindQuinielaByUserIdDto {
  @IsString()
  userId: string;
}
