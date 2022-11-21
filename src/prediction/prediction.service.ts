import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';
import { User } from '../auth/entities/user.entity';
import { Quiniela } from '../quiniela/entities/quiniela.entity';
import { Player } from '../player/entities/player.entity';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class PredictionService {
  constructor(
    @InjectModel(Prediction.name)
    private readonly predictionModel: Model<Prediction>,
    private readonly httpService: HttpService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Quiniela.name)
    private readonly quinielaModel: Model<Quiniela>,
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async create(createPredictionDto: CreatePredictionDto, user: User) {
    try {
      const newPrediction = await this.predictionModel.create({
        ...createPredictionDto,
        userId: user._id.toString(),
      });

      return newPrediction;
    } catch (error) {
      return error;
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    console.log('ejecutando');
    let matches = [];
    let players = [];

    await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/schedule?api_key=IVx11koARWP6Rb4a&leagueId=1572',
      )
      .then((res) => (matches = res.data.data));

    const users = await this.userModel.find();
    console.log('matches:', matches);

    for (const user of users) {
      const quinielas = await this.quinielaModel.find({
        userId: user._id,
      });

      await this.userModel.findByIdAndUpdate(user._id.toString(), {
        $set: {
          points: 0,
        },
      });

      for (let index = 0; index < quinielas.length; index++) {
        const promiseArray = quinielas[index].prediction.map((predictionId) => {
          return this.predictionModel.findById(predictionId);
        });

        const arrayPredictions = await Promise.all(promiseArray).then(
          (res) => res,
        );

        for (const match of matches) {
          if (match.status === 0) continue;

          for (const matchPrediction of arrayPredictions) {
            if (match.matchId === matchPrediction.matchId) {
              if (
                matchPrediction.results.homeScore?.length === 0 ||
                matchPrediction.results.awayScore?.length === 0
              )
                continue;

              if (
                Number(matchPrediction.results.homeScore) === match.homeScore &&
                Number(matchPrediction.results.awayScore) === match.awayScore
              ) {
                // 6 puntos por acertar marcador Y resultado
                console.log('6 puntos');

                await this.userModel.findByIdAndUpdate(matchPrediction.userId, {
                  $inc: {
                    points: 6,
                  },
                });
              } else if (
                match.homeScore > match.awayScore &&
                Number(matchPrediction.results.homeScore) >
                  Number(matchPrediction.results.awayScore)
              ) {
                // 3 puntos por acertar el resultado
                console.log('3 puntos');

                await this.userModel.findByIdAndUpdate(matchPrediction.userId, {
                  $inc: {
                    points: 3,
                  },
                });
              } else if (
                match.homeScore < match.awayScore &&
                Number(matchPrediction.results.homeScore) <
                  Number(matchPrediction.results.awayScore)
              ) {
                // 3 puntos por acertar el resultado
                console.log('3 puntos');

                await this.userModel.findByIdAndUpdate(matchPrediction.userId, {
                  $inc: {
                    points: 3,
                  },
                });
              }
            }
          }
        }
      }
    }

    const playersPredictions = await this.playerModel.find();

    if (playersPredictions?.length === 0) return;

    const dateUtc = moment.utc();
    const timeNow = moment.tz(dateUtc, 'America/Caracas').unix();

    if (timeNow < 1671382800) return; //validacion para que solo se ejecute cuando haya terminado la fase final

    await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/topscorer?api_key=IVx11koARWP6Rb4a&leagueId=1572',
      )
      .then((res) => (players = res.data.data));

    for (const playerPrediction of playersPredictions) {
      if (playerPrediction.playerName === players[0].playerName) {
        // 10 puntos por acertar jugador

        await this.userModel.findByIdAndUpdate(
          playerPrediction.userId.toString(),
          {
            $inc: {
              points: 10,
            },
          },
        );
        if (Number(playerPrediction.goals) === Number(players[0].goalsCount)) {
          // 15 puntos por acertar el numero de goles del jugador
          await this.userModel.findByIdAndUpdate(
            playerPrediction.userId.toString(),
            {
              $inc: {
                points: 15,
              },
            },
          );
        }
      }
    }
  }

  async getMatchesFromApi() {
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/schedule?api_key=IVx11koARWP6Rb4a&leagueId=1572',
      )
      .then((res) => res.data);

    return res;
  }

  async getPlayersFromApi() {
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/topscorer?api_key=IVx11koARWP6Rb4a&leagueId=1572',
      )
      .then((res) => res.data);
    return res;
  }

  findOne(id: string) {
    return this.predictionModel.findById(id);
  }

  async getAllByUserId(id: string) {
    const predictionsByUser = await this.predictionModel.find({ userId: id });
    return predictionsByUser;
  }

  async update(id: string, updatePredictionDto: UpdatePredictionDto) {
    const prediction = await this.predictionModel.findById(id);

    return `This action updates a #${prediction} prediction  for ${updatePredictionDto}`;
  }
}
