import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Quiniela, QuinielaSchema } from '../quiniela/entities/quiniela.entity';
import {
  Prediction,
  PredictionSchema,
} from '../prediction/entities/prediction.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Quiniela.name, schema: QuinielaSchema },
      { name: Prediction.name, schema: PredictionSchema },
    ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '' + process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
