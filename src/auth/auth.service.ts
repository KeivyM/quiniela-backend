import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AddIdQuinielaDto } from './dto/add-id-quiniela.dto';
import { AddPointsDto } from './dto/add-points.dto';

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
        points: 0,
        password: bcrypt.hashSync(password, 10),
      });

      return {
        ...user,
        token: this.getJwtToken({ id: user._id.toString() }),
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
      token: this.getJwtToken({ id: user._id.toString() }),
    };
    //generar JWT
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user._id.toString() }),
    };
    //ge
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async addQuinielaId(userId: string, quinielaId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      $push: {
        quiniela: quinielaId,
      },
    });
  }

  async addPoints(obj: AddPointsDto) {
    const user = await this.userModel.findByIdAndUpdate(obj.userId, {
      $inc: {
        points: obj.points,
      },
    });

    return user;
  }

  resetPoints({ userId }) {
    return this.userModel.findByIdAndUpdate(userId, {
      $set: {
        points: 0,
      },
    });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    // console.log(id);
    return this.userModel.findById(id);
  }

  // addQuiniela(id, idQuiniela: AddIdQuinielaDto) {
  //   // this.userModel.findOneAndUpdate()
  //   //puedo mostrar el id en consola
  //   console.log(idQuiniela, id);
  //   return 'Esto agrega un id de la quiniela creada, en el array del user';
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    // this.users = this.users.filter((user) => user.id !== id);
    return `This action removes a #${id} user`;
  }
}
