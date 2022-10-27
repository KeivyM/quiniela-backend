import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AddPointsDto } from './dto/add-points.dto';
import { Quiniela } from '../quiniela/entities/quiniela.entity';
import { Prediction } from '../prediction/entities/prediction.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,

    @InjectModel(Quiniela.name)
    private readonly quinielaModel: Model<Quiniela>,

    @InjectModel(Prediction.name)
    private readonly predictionModel: Model<Prediction>,
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
        ...user.toJSON(),
        token: this.getJwtToken({ id: user._id.toString() }),
      };
    } catch (error) {
      return error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel
      .findOne({
        email: email,
      })
      .lean();

    if (!user) return 'Correo Incorrecto';

    if (!bcrypt.compareSync(password, user.password))
      return 'Contraseña Incorrecta';

    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user._id.toString() }),
    };
    //generar JWT
  }

  async checkAuthStatus(user: User) {
    return {
      ...user.toJSON(),
      token: this.getJwtToken({ id: user._id.toString() }),
    };
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
    return this.userModel.findById(id);
  }

  async remove(id: string, { password }) {
    try {
      const user = await this.userModel.findById(id);

      if (!bcrypt.compareSync(password, user.password)) return;

      for (const quiniela of user.quiniela) {
        await this.quinielaModel.findByIdAndDelete(quiniela);
      }
      const predictions = await this.predictionModel.find({ userId: id });
      for (const prediction of predictions) {
        await this.predictionModel.findByIdAndDelete(prediction._id);
      }

      await this.userModel.findByIdAndDelete(user._id);
      //eliminar quinielas relacionadas
      //eliminar predicciones relacionadas
    } catch (error) {
      return `A user with id "${error.value}" not exits`;
    }

    return `This action removes a #${id} user`;
  }
}
