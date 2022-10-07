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

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const dataDePrueba = [
      {
        matchId: '2270583212125',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1668959940,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 4,
        awayScore: 6,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        location: 'Khalifa International',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '11235267058129',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669035600,
        halfStartTime: 0,
        status: 10,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 1,
        awayScore: 0,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '771221237058126',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669046340,
        status: 10,
        homeId: '815',
        homeName: 'Senegal',
        awayId: '646',
        awayName: 'Netherlands',
        homeScore: 3,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '341232193358121',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669057200,
        halfStartTime: 0,
        status: 10,
        homeId: '797',
        homeName: 'USA',
        awayId: '7384',
        awayName: 'Wales',
        homeScore: 0,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '22705812339875',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1668959940,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 2,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        location: 'Khalifa International',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '267058108765429',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669035600,
        halfStartTime: 0,
        status: 10,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 2,
        awayScore: 5,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '23705678958126',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669046340,
        status: 10,
        homeId: '815',
        homeName: 'Senegal',
        awayId: '646',
        awayName: 'Netherlands',
        homeScore: 3,
        awayScore: 4,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '39541335812144',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669057200,
        halfStartTime: 0,
        status: 10,
        homeId: '797',
        homeName: 'USA',
        awayId: '7384',
        awayName: 'Wales',
        homeScore: 5,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },

      {
        matchId: '2273312321058125',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1668959940,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 3,
        awayScore: 4,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        location: 'Khalifa International',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '267058789863129',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669035600,
        halfStartTime: 0,
        status: 10,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 0,
        awayScore: 0,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '23703458125546',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1969046340,
        status: 10,
        homeId: '815',
        homeName: 'Senegal',
        awayId: '646',
        awayName: 'Netherlands',
        homeScore: 3,
        awayScore: 3,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '3933586775433121',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1669057200,
        halfStartTime: 0,
        status: 10,
        homeId: '797',
        homeName: 'USA',
        awayId: '7384',
        awayName: 'Wales',
        homeScore: 4,
        awayScore: 1,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },

      {
        matchId: '22707600358125',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1668959940,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 5,
        awayScore: 5,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        location: 'Khalifa International',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '267058122987429',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1840007600,
        halfStartTime: 0,
        status: 10,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 3,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },

      {
        matchId: '227058155573225',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1780007600,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 8,
        awayScore: 8,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'A',
        location: 'Khalifa International',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 0,
          awayScore: 0,
          extraTimeStatus: 0,
          extraHomeScore: 0,
          extraAwayScore: 0,
          penHomeScore: 0,
          penAwayScore: 0,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 0,
        },
      },
      {
        matchId: '26705812955986332',
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        matchTime: 1770007600,
        halfStartTime: 0,
        status: 10,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 2,
        awayScore: 2,
        homeHalfScore: 0,
        awayHalfScore: 0,
        homeRed: 0,
        awayRed: 0,
        homeYellow: 0,
        awayYellow: 0,
        homeCorner: 0,
        awayCorner: 0,
        homeRank: '',
        awayRank: '',
        season: '2022',
        stageId: '21534',
        round: 'Groups',
        group: 'B',
        extraExplain: {
          kickOff: 0,
          minute: 0,
          homeScore: 2,
          awayScore: 2,
          extraTimeStatus: 0,
          extraHomeScore: 1,
          extraAwayScore: 1,
          penHomeScore: 2,
          penAwayScore: 4,
          twoRoundsHomeScore: 0,
          twoRoundsAwayScore: 0,
          winner: 2,
        },
      },
    ];

    const users = await this.userModel.find();

    for (const user of users) {
      // await this.httpService.axiosRef.get;

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

        for (const objprueba of dataDePrueba) {
          if (objprueba.status === 0) continue;

          for (const match of arrayPredictions) {
            //si predicen que va a haber un empate aciertan el marcador pero no el resultado y le daria 3 puntos

            if (objprueba.matchId === match.matchId) {
              if (objprueba.matchTime <= 1670007600) {
                console.log('actualizando puntos fase de grupos');

                if (
                  Number(match.results.homeScore) === objprueba.homeScore &&
                  Number(match.results.awayScore) === objprueba.awayScore
                ) {
                  //darle 6 puntos por acertar el marcador y resultado
                  // console.log('6 por marcador Y resultado');

                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 6,
                    },
                  });
                } else if (
                  objprueba.homeScore > objprueba.awayScore &&
                  Number(match.results.homeScore) >
                    Number(match.results.awayScore)
                ) {
                  // darle 3 puntos por acertar el resultado

                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 3,
                    },
                  });
                } else if (
                  objprueba.homeScore < objprueba.awayScore &&
                  Number(match.results.homeScore) <
                    Number(match.results.awayScore)
                ) {
                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 3,
                    },
                  });
                }
              } else {
                console.log('actualizando puntos resto de fases');

                if (
                  Number(match.results.homeScore) === objprueba.homeScore &&
                  Number(match.results.awayScore) === objprueba.awayScore &&
                  objprueba.awayScore === objprueba.homeScore
                ) {
                  //darle 3 puntos por acertar el marcador
                  // console.log('3 por marcador');

                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 3,
                    },
                  });
                } else if (
                  Number(match.results.homeScore) === objprueba.homeScore &&
                  Number(match.results.awayScore) === objprueba.awayScore
                ) {
                  //darle 6 puntos por acertar el marcador y resultado
                  // console.log('6 por marcador y resultado');

                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 6,
                    },
                  });
                } else if (
                  objprueba.homeScore > objprueba.awayScore &&
                  Number(match.results.homeScore) >
                    Number(match.results.awayScore)
                ) {
                  // darle 3 puntos por acertar el resultado

                  await this.userModel.findByIdAndUpdate(match.userId, {
                    $inc: {
                      points: 3,
                    },
                  });
                } else if (
                  objprueba.homeScore < objprueba.awayScore &&
                  Number(match.results.homeScore) <
                    Number(match.results.awayScore)
                ) {
                  await this.userModel.findByIdAndUpdate(match.userId, {
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
    }
  }

  async findAll() {
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/schedule?api_key=7ysUHBwXouU3Bb48&leagueId=1572',
      )
      .then((res) => res.data);

    return res;
  }

  findOne(id: string) {
    return this.predictionModel.findById(id);
  }

  async getAllByUserId(id: string) {
    const predictionsByUser = await this.predictionModel.find({ userId: id });
    // console.log(predictionsByUser.length);
    return predictionsByUser;
  }

  async update(id: string, updatePredictionDto: UpdatePredictionDto) {
    // console.log(updatePredictionDto.matchId);
    const prediction = await this.predictionModel.findById(id);

    return `This action updates a #${prediction} prediction  for ${updatePredictionDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
