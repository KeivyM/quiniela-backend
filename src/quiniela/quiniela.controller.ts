import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
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
import { FindQuinielaDto } from './dto/find-quiniela.dto';
import { FindQuinielaByUserIdDto } from './dto/findAllByUserId-quiniela.dto';

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
    console.log(quiniela._id);

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
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.quinielaService.findAll();
  }

  @Post('findQuinielasByUser')
  findAllQuinielasByUser(@Body() objeto: FindQuinielaByUserIdDto) {
    return this.quinielaService.findAllQuinielasByUser(objeto.userId);
  }

  @Post('find')
  findQuinielaByPhase(@Body() objeto: FindQuinielaDto) {
    return this.quinielaService.findQuinielaByPhase(
      objeto.userId,
      objeto.phase,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quinielaService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateQuinielaDto: UpdateQuinielaDto,
  ) {
    return this.quinielaService.update(user, updateQuinielaDto);
  }

  @Post('delete')
  remove(@Body() body) {
    return this.quinielaService.remove(body);
  }
}
