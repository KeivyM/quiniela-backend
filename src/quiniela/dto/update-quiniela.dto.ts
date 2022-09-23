import { PartialType } from '@nestjs/mapped-types';
import { CreateQuinielaDto } from './create-quiniela.dto';

export class UpdateQuinielaDto extends PartialType(CreateQuinielaDto) {}
