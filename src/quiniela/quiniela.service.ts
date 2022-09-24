import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuinielaDto } from './dto/create-quiniela.dto';
import { UpdateQuinielaDto } from './dto/update-quiniela.dto';
import { Quiniela } from './entities/quiniela.entity';

@Injectable()
export class QuinielaService {
  constructor(
    @InjectModel(Quiniela.name)
    private readonly quinielaModel: Model<Quiniela>,
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

  async findOne(id: string) {
    const quiniela = await this.quinielaModel.findById(id);
    return quiniela;
  }

  update(id: number, updateQuinielaDto: UpdateQuinielaDto) {
    return `This action updates a #${id} quiniela`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiniela`;
  }
}
