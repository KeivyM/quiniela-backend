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
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPredictionDto: CreatePredictionDto) {
    return this.predictionService.create(createPredictionDto);
  }

  @Get()
  findAll() {
    return this.predictionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredictionDto: UpdatePredictionDto,
  ) {
    return this.predictionService.update(+id, updatePredictionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionService.remove(+id);
  }
}
