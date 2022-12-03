import { Injectable, Logger } from '@nestjs/common';
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
  private logger = new Logger('bootstrap');
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

  // @Cron('30 12 * * *') //12:30 por la hora del servidor heroku
  // async handleCronSixAM() {
  //   console.log('Actualizando a las 8:30AM');
  //   this.updatePoints();
  // }

  // @Cron('30 15 * * *') //03:30pm
  // async handleCronNineAM() {
  //   console.log('Actualizando a las 11:30AM');
  //   this.updatePoints();
  // }

  // @Cron('30 18 * * *') //06:30pm
  // async handleCronTwelvePM() {
  //   console.log('Actualizando a las 2:30PM');
  //   this.updatePoints();
  // }

  // @Cron('30 17 * * *') //05:30pmm
  // async handleCronElevenAM() {
  //   console.log('Actualizando a las 1:30PM');
  //   this.updatePoints();
  // }

  // @Cron('30 21 * * *') //09:30pm
  // async handleCronThreePM() {
  //   console.log('Actualizando a las 5:30PM');
  //   this.updatePoints();
  // }

  @Cron('30 17 * * *') //05:30pmm
  async handleCronElevenAM() {
    console.log('Actualizando a las 1:30PM');
    this.logger.log('Actualizando a las 1:30PM');
    this.updatePoints();
  }

  @Cron('30 21 * * *') //09:30pm
  async handleCronThreePM() {
    console.log('Actualizando a las 5:30PM');
    this.logger.log('Actualizando a las 5:30PM');
    this.updatePoints();
  }

  async updatePoints() {
    let matches = [];
    let players = [];

    await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/schedule?api_key=YbovmuVeXjhXsohg&leagueId=1572',
      )
      .then((res) => (matches = res.data.data));

    const users = await this.userModel.find();

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
          // const prediccion =
          //   this.predictionModel.findById(predictionId);
          // if (!prediccion) {
          // }
          // return prediccion;
        });

        const arrayPredictions = await Promise.all(promiseArray).then(
          (res) => res,
        );
        // let arrayPredictions = await Promise.all(promiseArray).then(
        //   (res) => res,
        // );
        // arrayPredictions = arrayPredictions.filter(
        //   (element) => !(element === null),
        // );

        for (const match of matches) {
          if (match.status != -1) continue;

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

                await this.userModel.findByIdAndUpdate(matchPrediction.userId, {
                  $inc: {
                    points: 3,
                  },
                });
              } else if (
                Number(matchPrediction.results.homeScore) ===
                  Number(matchPrediction.results.awayScore) &&
                match.homeScore === match.awayScore
              ) {
                // 3 puntos por acertar el resultado que sea empate

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
        'http://api.isportsapi.com/sport/football/topscorer?api_key=YbovmuVeXjhXsohg&leagueId=1572',
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
        'http://api.isportsapi.com/sport/football/schedule?api_key=YbovmuVeXjhXsohg&leagueId=1572',
      )
      .then((res) => res.data);

    return res;
  }

  async getPlayersFromApi() {
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/topscorer?api_key=YbovmuVeXjhXsohg&leagueId=1572',
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

  async dangerPredictionCleaning(quinielaId: string) {
    try {
      const quiniela = await this.quinielaModel.findById(quinielaId);

      let arrayPredictions = [];

      for (const predictionId of quiniela.prediction) {
        const prediction = await this.predictionModel.findById(predictionId);
        arrayPredictions.push(prediction);
      }

      let hash = {};

      for (const predic of arrayPredictions) {
        if (hash[predic.matchId]) {
          await this.predictionModel.findByIdAndDelete(predic._id);
          await this.quinielaModel.findByIdAndUpdate(
            { _id: quinielaId },
            {
              $pull: {
                prediction: { $eq: predic._id.toString() },
              },
            },
          );
        } else {
          hash[predic.matchId] = predic;
        }
      }

      return { quiniela };
    } catch (error) {
      console.log(error);
    }
  }

  async eliminaLasDeOtrasQuinielas(quinielaId: string) {
    //elimina predicciones de otras fases en la quiniela octavos
    const octavos = [
      '101620324',
      '238620324',
      '397820321',
      '387820320',
      '208820323',
      '218820324',
      '228820325',
      '238820326',
    ];
    try {
      const quiniela = await this.quinielaModel.findById(quinielaId);

      let arrayPredictions = [];

      for (const predictionId of quiniela.prediction) {
        const prediction = await this.predictionModel.findById(predictionId);
        arrayPredictions.push(prediction);
      }

      for (let index = 0; index < arrayPredictions.length; index++) {
        if (!octavos.includes(arrayPredictions[index].matchId)) {
          await this.predictionModel.findByIdAndDelete(
            arrayPredictions[index]._id,
          );
          await this.quinielaModel.findByIdAndUpdate(
            { _id: quinielaId },
            {
              $pull: {
                prediction: { $eq: arrayPredictions[index]._id.toString() },
              },
            },
          );
        }
      }

      return { quiniela };
    } catch (error) {
      console.log(error);
    }
  }
}
