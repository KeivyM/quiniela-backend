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
import { PredictionService } from '../prediction/prediction.service';
import { AuthService } from '../auth/auth.service';

@Controller('quiniela')
export class QuinielaController {
  constructor(
    private readonly quinielaService: QuinielaService,

    private readonly predictionService: PredictionService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createQuinielaDto: CreateQuinielaDto,
    @GetUser() user: User,
  ) {
    const quiniela = await this.quinielaService.create(
      createQuinielaDto,
      user._id.toString(),
    );

    await this.authService.addQuinielaId(user._id, quiniela._id.toString());

    createQuinielaDto.predictions.map(async (prediction) => {
      const registration = await this.predictionService.create(
        prediction,
        user,
      );

      await this.quinielaService.addPredictionId(
        quiniela._id,
        registration._id.toString(),
      );
    });
    //el metodo de crear predicciones debe recibir un array de objetos y crear un registro en la base de datos con cada objeto
    // this.predictionService.create(obj, user);
    // return this.quinielaService.create(createQuinielaDto, user._id.toString());
  }

  @Get()
  //@UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.quinielaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quinielaService.findOne(id);
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
