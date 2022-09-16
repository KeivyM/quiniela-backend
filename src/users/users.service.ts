import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: uuid(),
      name: 'luis',
      lastName: 'Roa',
      username: 'LuisR',
      email: 'luis@gmail.com',
      password: '123qweASD.',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuid(),
      ...createUserDto,
    };

    this.users.push(user);
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
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
    this.users = this.users.filter((user) => user.id !== id);
    return `This action removes a #${id} user`;
  }
}
