import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  // @IsString()
  // @IsUUID()
  id: string;

  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @MinLength(2)
  readonly lastName: string;

  @IsString()
  @MinLength(2)
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
