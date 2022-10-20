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

// import { GetUser } from 'src/decorators/get-user.decorator';
//termina fase de grupos a las 11 am y debo saber despues de cada fase a cuanto tiempo se actualiza la api
//1670001000 a la 1 pm del mismo dia

//1670079600 hora del primer partido de octavos
//1670353200 hora del ultimo partido de octavos

//1670598000 hora del primer partido de cuartos
//1670698800 hora del ultimo partido de cuartos

//1670958000 hora del primer partido de semifinales
//1671044400 hora del ultimo partido de semifinales

//1671289200 hora del primer partido de final
//1671375600 hora del ultimo partido de final

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
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) //cambiar
  async handleCron() {
    const matches = [
      {
        matchId: '227058125',
        leagueId: '1572',
        matchTime: 1668959940,
        status: 10,
        homeName: 'Qatar',
        awayName: 'Ecuador',
        homeScore: 14,
        awayScore: 6,
      },
      {
        matchId: '267058129',
        leagueId: '1572',
        matchTime: 1669035600,
        status: 10,
        homeName: 'England',
        awayName: 'Iran',
        homeScore: 3,
        awayScore: 2,
      },
      {
        matchId: '237058126',
        leagueId: '1572',
        matchTime: 1669046340,
        status: 10,
        homeName: 'Senegal',
        awayName: 'Netherlands',
        homeScore: 10,
        awayScore: 11,
      },
      {
        matchId: '393358121',
        leagueId: '1572',
        matchTime: 1669057200,
        status: 10,
        homeName: 'USA',
        awayName: 'Wales',
        homeScore: 9,
        awayScore: 6,
      },
      {
        matchId: '228058126',
        leagueId: '1572',
        matchTime: 1669111200,
        status: 0,
        homeName: 'Argentina',
        awayName: 'Saudi Arabia',
        homeScore: 0,
        awayScore: 0,
      },
      {
        matchId: '368058120',
        leagueId: '1572',
        matchTime: 1669122000,
        status: 0,
        homeName: 'Denmark',
        awayName: 'Tunisia',
        homeScore: 0,
        awayScore: 0,
      },
      {
        matchId: '218058125',
        leagueId: '1572',
        matchTime: 1669132740,
        status: 0,
        homeName: 'Mexico',
        awayName: 'Poland',
        homeScore: 0,
        awayScore: 0,
      },
      {
        matchId: '205358124',
        leagueId: '1572',
        matchTime: 1669143600,
        status: 0,
        homeName: 'France',
        awayName: 'Australia',
        homeScore: 0,
        awayScore: 0,
      },
    ]; // eliminar data de prueba

    // let matches = [];
    let players = [];

    // await this.httpService.axiosRef
    //   .get(
    //     'http://api.isportsapi.com/sport/football/schedule?api_key=I8jtvf8X8IFwls69&leagueId=13014',
    //   )
    //   .then((res) => (matches = res.data.data)); //cambiar leagueId a 1572 y api_key

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
        });

        const arrayPredictions = await Promise.all(promiseArray).then(
          (res) => res,
        );

        for (const match of matches) {
          if (match.status === 0) continue;

          for (const matchPrediction of arrayPredictions) {
            if (match.matchId === matchPrediction.matchId) {
              if (match.matchTime <= 1670007600) {
                if (
                  matchPrediction.results.homeScore?.length === 0 ||
                  matchPrediction.results.awayScore?.length === 0
                )
                  continue;
                if (
                  Number(matchPrediction.results.homeScore) ===
                    match.homeScore &&
                  Number(matchPrediction.results.awayScore) === match.awayScore
                ) {
                  // 6 puntos por marcador Y resultado

                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 6,
                      },
                    },
                  );
                } else if (
                  match.homeScore > match.awayScore &&
                  Number(matchPrediction.results.homeScore) >
                    Number(matchPrediction.results.awayScore)
                ) {
                  // 3 puntos por acertar el resultado

                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 3,
                      },
                    },
                  );
                } else if (
                  match.homeScore < match.awayScore &&
                  Number(matchPrediction.results.homeScore) <
                    Number(matchPrediction.results.awayScore)
                ) {
                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 3,
                      },
                    },
                  );
                }
              } else {
                // console.log('actualizando puntos resto de fases');

                if (
                  Number(matchPrediction.results.homeScore) ===
                    match.homeScore &&
                  Number(matchPrediction.results.awayScore) ===
                    match.awayScore &&
                  match.awayScore === match.homeScore
                ) {
                  //darle 3 puntos por acertar el marcador

                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 3,
                      },
                    },
                  );
                } else if (
                  Number(matchPrediction.results.homeScore) ===
                    match.homeScore &&
                  Number(matchPrediction.results.awayScore) === match.awayScore
                ) {
                  //darle 6 puntos por acertar el marcador y resultado

                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 6,
                      },
                    },
                  );
                } else if (
                  match.homeScore > match.awayScore &&
                  Number(matchPrediction.results.homeScore) >
                    Number(matchPrediction.results.awayScore)
                ) {
                  // darle 3 puntos por acertar el resultado

                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 3,
                      },
                    },
                  );
                } else if (
                  match.homeScore < match.awayScore &&
                  Number(matchPrediction.results.homeScore) <
                    Number(matchPrediction.results.awayScore)
                ) {
                  await this.userModel.findByIdAndUpdate(
                    matchPrediction.userId,
                    {
                      $inc: {
                        points: 3,
                      },
                    },
                  );
                }
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
        'http://api.isportsapi.com/sport/football/topscorer?api_key=I8jtvf8X8IFwls69&leagueId=13014',
      )
      .then((res) => (players = res.data.data)); //cambiar leagueId a 1572

    for (const playerPrediction of playersPredictions) {
      if (playerPrediction.playerName === players[0].playerName) {
        //darle 10 puntos por acertar jugador

        await this.userModel.findByIdAndUpdate(
          playerPrediction.userId.toString(),
          {
            $inc: {
              points: 10,
            },
          },
        );
        if (Number(playerPrediction.goals) === Number(players[0].goalsCount)) {
          //darle 15 puntos por acertar el numero de goles del jugador
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
        'http://api.isportsapi.com/sport/football/schedule?api_key=I8jtvf8X8IFwls69&leagueId=1572',
      )
      .then((res) => res.data);

    return res;
  }

  async getPlayersFromApi() {
    //cambiar leagueId y api_key
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/topscorer?api_key=I8jtvf8X8IFwls69&leagueId=13014',
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
