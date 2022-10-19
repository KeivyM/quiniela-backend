import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/entities/user.entity';
import { Prediction } from '../prediction/entities/prediction.entity';
import { CreateQuinielaDto } from './dto/create-quiniela.dto';
import { UpdateQuinielaDto } from './dto/update-quiniela.dto';
import { Quiniela } from './entities/quiniela.entity';

@Injectable()
export class QuinielaService {
  constructor(
    @InjectModel(Quiniela.name)
    private readonly quinielaModel: Model<Quiniela>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
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

  async findAllQuinielasByUser(userId: string) {
    const quinielas = await this.quinielaModel.find({
      userId: userId,
    });

    return quinielas;
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

    const quiniela = await this.quinielaModel.findOne({
      userId: userId,
      phase: updateQuinielaDto.phase,
    });

    for (const predictionUpdate of updateQuinielaDto.predictions) {
      const prediction = await this.predictionModel.findOne({
        userId: userId,
        matchId: predictionUpdate.matchId,
      });

      if (!!prediction) {
        if (prediction) {
          await this.predictionModel.findByIdAndUpdate(prediction._id, {
            ...predictionUpdate,
          });
        }
      } else {
        try {
          const newPrediction = await this.predictionModel.create({
            ...predictionUpdate,
            userId: user._id.toString(),
          });

          await this.quinielaModel.findByIdAndUpdate(quiniela._id.toString(), {
            $push: {
              prediction: newPrediction._id.toString(),
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    return `This action updates a quiniela`;
  }

  async remove({ userId, phase }) {
    const quiniela = await this.quinielaModel.find({
      userId: userId,
      phase: phase,
    });
    if (quiniela?.length === 0) return;

    for (const predictionId of quiniela[0]?.prediction) {
      await this.predictionModel.findByIdAndRemove(predictionId);
    }

    await this.quinielaModel.findByIdAndRemove(quiniela[0]?._id);
    const user = await this.userModel.findById(userId);
    const newArrayQuinielas = user.quiniela.filter(
      (quinielaId) => quinielaId !== quiniela[0]?._id.toString(),
    );

    await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        quiniela: newArrayQuinielas,
      },
    });
    return `This action removes a #${phase}, #${userId} quiniela`;
  }
}
