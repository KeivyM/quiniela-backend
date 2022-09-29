import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Prediction } from '../prediction/entities/prediction.entity';
import { CreateQuinielaDto } from './dto/create-quiniela.dto';
import { UpdateQuinielaDto } from './dto/update-quiniela.dto';
import { Quiniela } from './entities/quiniela.entity';

@Injectable()
export class QuinielaService {
  constructor(
    @InjectModel(Quiniela.name)
    private readonly quinielaModel: Model<Quiniela>,
    @InjectModel(Prediction.name)
    private readonly predictionModel: Model<Prediction>, // @Inject() // para injectar un servicio
  ) {}

  async create(createQuinielaDto: CreateQuinielaDto, id: string) {
    try {
      const newQuiniela = await this.quinielaModel.create({
        ...createQuinielaDto,
        userId: id,
      });

      return newQuiniela;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const quinielas = this.quinielaModel.find();
    return quinielas;
  }

  async findQuinielaByPhase(userId: string, phase: string) {
    const quiniela = await this.quinielaModel.findOne({
      userId: userId,
      phase: phase,
    });

    return quiniela;
  }

  async findOne(id: string) {
    const quiniela = await this.quinielaModel.findById(id);
    return quiniela;
  }

  async addPredictionId(quinielaiId: string, predictionId: string) {
    await this.quinielaModel.findByIdAndUpdate(quinielaiId, {
      $push: {
        prediction: predictionId,
      },
    });
  }

  async update(user: User, updateQuinielaDto: UpdateQuinielaDto) {
    const userId = user._id.toString();

    for (const predictionUpdate of updateQuinielaDto.predictions) {
      const prediction = await this.predictionModel.findOne({
        userId: userId,
        matchId: predictionUpdate.matchId,
      });

      if (prediction) {
        await this.predictionModel.findByIdAndUpdate(prediction._id, {
          ...predictionUpdate,
        });
      }
    }
    return `This action updates a quiniela`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiniela`;
  }
}
