import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { Prediction } from './entities/prediction.entity';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Quiniela } from 'src/quiniela/entities/quiniela.entity';

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

  //UN CRON que se ejecute cada media noche y compare las predicciones de cada user y le de los puntos

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const dataDePrueba = [
      {
        matchId: '227058125',
        leagueType: 2,
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        leagueColor: '#660000',
        subLeagueId: '',
        subLeagueName: '',
        matchTime: 1668959940,
        halfStartTime: 0,
        status: 10,
        homeId: '904',
        homeName: 'Qatar',
        awayId: '779',
        awayName: 'Ecuador',
        homeScore: 7, //2
        awayScore: 5, //5
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
        weather: '',
        temperature: '',
        explain: '',
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
        hasLineup: false,
        neutral: false,
      },
      {
        matchId: '267058129',
        leagueType: 2,
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        leagueColor: '#660000',
        subLeagueId: '',
        subLeagueName: '',
        matchTime: 1669035600,
        halfStartTime: 0,
        status: 0,
        homeId: '744',
        homeName: 'England',
        awayId: '783',
        awayName: 'Iran',
        homeScore: 4, //9
        awayScore: 0, //4
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
        location: '',
        weather: '',
        temperature: '',
        explain: '',
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
        hasLineup: false,
        neutral: true,
      },
      {
        matchId: '237058126',
        leagueType: 2,
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        leagueColor: '#660000',
        subLeagueId: '',
        subLeagueName: '',
        matchTime: 1669046340,
        halfStartTime: 0,
        status: 0,
        homeId: '815',
        homeName: 'Senegal',
        awayId: '646',
        awayName: 'Netherlands',
        homeScore: 10, //4
        awayScore: 20, //2
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
        location: '',
        weather: '',
        temperature: '',
        explain: '',
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
        hasLineup: false,
        neutral: true,
      },
      {
        matchId: '393358121',
        leagueType: 2,
        leagueId: '1572',
        leagueName: 'FIFA World Cup',
        leagueShortName: 'World Cup',
        leagueColor: '#660000',
        subLeagueId: '',
        subLeagueName: '',
        matchTime: 1669057200,
        halfStartTime: 0,
        status: 0,
        homeId: '797',
        homeName: 'USA',
        awayId: '7384',
        awayName: 'Wales',
        homeScore: 3, //2
        awayScore: 2, //2
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
        location: '',
        weather: '',
        temperature: '',
        explain: '',
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
        hasLineup: false,
        neutral: true,
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

      // console.log(quinielas);

      for (let index = 0; index < quinielas.length; index++) {
        const promiseArray = quinielas[index].prediction.map((predictionId) => {
          return this.predictionModel.findById(predictionId);
        });

        const arrayPredictions = await Promise.all(promiseArray).then(
          (res) => res,
        );
        // console.log(arrayPredictions);

        for (const objprueba of dataDePrueba) {
          if (objprueba.status === 0) continue;

          console.log('AQUI:', user._id.toString());
          for (const match of arrayPredictions) {
            // console.log("Aqui", match);
            console.log(match.userId);

            if (objprueba.matchId === match.matchId) {
              if (
                Number(match.results.homeScore) === objprueba.homeScore &&
                Number(match.results.awayScore) === objprueba.awayScore
              ) {
                //darle 6 puntos por acertar el marcador
                console.log('6 por marcador Y resultado');

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
