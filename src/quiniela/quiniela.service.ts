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

  async create(createQuinielaDto: CreateQuinielaDto) {
    try {
      const { ...result } = createQuinielaDto;
      console.log(result);
      this.quinielaModel.create({ ...result });
      // const user = await this.userModel.create({
      //   ...result,
      //   password: bcrypt.hashSync(password, 10),
      // });

      return createQuinielaDto;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all quiniela`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiniela`;
  }

  update(id: number, updateQuinielaDto: UpdateQuinielaDto) {
    return `This action updates a #${id} quiniela`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiniela`;
  }
}
