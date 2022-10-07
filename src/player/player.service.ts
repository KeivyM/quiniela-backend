import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto, id: string) {
    try {
      const player = await this.playerModel.create({
        ...createPlayerDto,
        userId: id,
      });

      return player;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const players = await this.playerModel.find();
    return players;
  }

  async findOne(id: string) {
    return await this.playerModel.findById(id);
  }

  async findOneByUserId(userId: string) {
    return await this.playerModel.findOne({ userId });
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const actualizado = await this.playerModel.findByIdAndUpdate(
      id,
      updatePlayerDto,
    );
    return actualizado;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
