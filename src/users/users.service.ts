import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private users: User[] = [
    // {
    //   id: uuid(),
    //   name: 'luis',
    //   lastName: 'Roa',
    //   username: 'LuisR',
    //   email: 'luis@gmail.com',
    //   password: '123',
    // },
  ];

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    try {
      createUserDto.id = uuid();
      // createUserDto.id = uuid();
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      return error;
    }
    // const user: User = {
    //   id: uuid(),
    //   ...createUserDto,
    // };

    // this.users.push(user);
    // return user;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id '${id}' not found`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    // this.users = this.users.filter((user) => user.id !== id);
    return `This action removes a #${id} user`;
  }
}
