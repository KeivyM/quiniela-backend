import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';

@Injectable()
export class PredictionService {
  constructor(
    @InjectModel(Prediction.name)
    private readonly userModel: Model<Prediction>,
  ) {}

  create(createPredictionDto: CreatePredictionDto) {
    return 'This action adds a new prediction';
  }

  findAll() {
    return `This action returns all prediction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
