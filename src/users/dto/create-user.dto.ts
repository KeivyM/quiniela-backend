import { IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
