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
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createPredictionDto: CreatePredictionDto,
    @GetUser() user: User,
  ) {
    return this.predictionService.create(createPredictionDto, user);
  }

  @Get()
  findAll() {
    return this.predictionService.findAll();
  }

  @Get('findAll/:id')
  getAllByUserId(@Param('id') id: string) {
    return this.predictionService.getAllByUserId(id);
  }
  //RUTA PARA OBTENER TODAS LAS PREDICTIONS DE UN USER PARA MOSTRAR LOS DATOS LLENOS AL ENTRAR

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredictionDto: UpdatePredictionDto,
  ) {
    return this.predictionService.update(id, updatePredictionDto);
  }
}
