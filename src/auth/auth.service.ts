import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...result } = createUserDto;

      const user = await this.userModel.create({
        ...result,
        password: bcrypt.hashSync(password, 10),
      });
      // console.log('Auth.Service', {
      //   ...user,
      //   token: this.getJwtToken({ email: user.email }),
      // });
      // console.log({ ...user });

      // delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ email: user.email }),
      };
      //generar JWT
    } catch (error) {
      return error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) return 'Email Incorrecto';

    if (!bcrypt.compareSync(password, user.password))
      return 'Password Incorrecta';

    return {
      ...user,
      token: this.getJwtToken({ email: user.email }),
    };
    //generar JWT
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    console.log('en auth.service', this.userModel.findById(id));
    return this.userModel.findById(id);
    // const user = this.users.find((user) => user.id === id);
    // if (!user) throw new NotFoundException(`User with id '${id}' not found`);

    // return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    // this.users = this.users.filter((user) => user.id !== id);
    return `This action removes a #${id} user`;
  }
}
