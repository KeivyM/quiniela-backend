import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuinielaService } from './quiniela.service';
import { CreateQuinielaDto } from './dto/create-quiniela.dto';
import { UpdateQuinielaDto } from './dto/update-quiniela.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('quiniela')
export class QuinielaController {
  constructor(private readonly quinielaService: QuinielaService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createQuinielaDto: CreateQuinielaDto, @GetUser() user: User) {
    return this.quinielaService.create(createQuinielaDto, user);
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
