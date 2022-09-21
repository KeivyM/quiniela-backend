import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsString()
  @MinLength(1)
  readonly lastName: string;

  @IsString()
  @MinLength(2)
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
