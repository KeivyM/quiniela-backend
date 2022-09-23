import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuinielaService } from './quiniela.service';
import { CreateQuinielaDto } from './dto/create-quiniela.dto';
import { UpdateQuinielaDto } from './dto/update-quiniela.dto';

@Controller('quiniela')
export class QuinielaController {
  constructor(private readonly quinielaService: QuinielaService) {}

  @Post('create')
  create(@Body() createQuinielaDto: CreateQuinielaDto) {
    return this.quinielaService.create(createQuinielaDto);
  }

  @Get()
  findAll() {
    return this.quinielaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quinielaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuinielaDto: UpdateQuinielaDto,
  ) {
    return this.quinielaService.update(+id, updateQuinielaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quinielaService.remove(+id);
  }
}
