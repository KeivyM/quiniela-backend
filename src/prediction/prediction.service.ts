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
      // console.log('EN predicction', newPrediction);
      return newPrediction;
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    // const matches = [
    //   {
    //     matchId: '2270583212125',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1668959940,
    //     status: 10,
    //     homeId: '904',
    //     homeName: 'Qatar',
    //     awayId: '779',
    //     awayName: 'Ecuador',
    //     homeScore: 4,
    //     awayScore: 6,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     location: 'Khalifa International',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '11235267058129',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669035600,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '744',
    //     homeName: 'England',
    //     awayId: '783',
    //     awayName: 'Iran',
    //     homeScore: 1,
    //     awayScore: 0,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '771221237058126',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669046340,
    //     status: 10,
    //     homeId: '815',
    //     homeName: 'Senegal',
    //     awayId: '646',
    //     awayName: 'Netherlands',
    //     homeScore: 3,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '341232193358121',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669057200,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '797',
    //     homeName: 'USA',
    //     awayId: '7384',
    //     awayName: 'Wales',
    //     homeScore: 0,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '22705812339875',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1668959940,
    //     status: 10,
    //     homeId: '904',
    //     homeName: 'Qatar',
    //     awayId: '779',
    //     awayName: 'Ecuador',
    //     homeScore: 2,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     location: 'Khalifa International',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '267058108765429',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669035600,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '744',
    //     homeName: 'England',
    //     awayId: '783',
    //     awayName: 'Iran',
    //     homeScore: 2,
    //     awayScore: 5,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '23705678958126',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669046340,
    //     status: 10,
    //     homeId: '815',
    //     homeName: 'Senegal',
    //     awayId: '646',
    //     awayName: 'Netherlands',
    //     homeScore: 3,
    //     awayScore: 4,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '39541335812144',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669057200,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '797',
    //     homeName: 'USA',
    //     awayId: '7384',
    //     awayName: 'Wales',
    //     homeScore: 5,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },

    //   {
    //     matchId: '2273312321058125',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1668959940,
    //     status: 10,
    //     homeId: '904',
    //     homeName: 'Qatar',
    //     awayId: '779',
    //     awayName: 'Ecuador',
    //     homeScore: 3,
    //     awayScore: 4,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     location: 'Khalifa International',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '267058789863129',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669035600,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '744',
    //     homeName: 'England',
    //     awayId: '783',
    //     awayName: 'Iran',
    //     homeScore: 0,
    //     awayScore: 0,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '23703458125546',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1969046340,
    //     status: 10,
    //     homeId: '815',
    //     homeName: 'Senegal',
    //     awayId: '646',
    //     awayName: 'Netherlands',
    //     homeScore: 3,
    //     awayScore: 3,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '3933586775433121',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1669057200,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '797',
    //     homeName: 'USA',
    //     awayId: '7384',
    //     awayName: 'Wales',
    //     homeScore: 4,
    //     awayScore: 1,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },

    //   {
    //     matchId: '22707600358125',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1668959940,
    //     status: 10,
    //     homeId: '904',
    //     homeName: 'Qatar',
    //     awayId: '779',
    //     awayName: 'Ecuador',
    //     homeScore: 5,
    //     awayScore: 5,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     location: 'Khalifa International',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '267058122987429',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1840007600,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '744',
    //     homeName: 'England',
    //     awayId: '783',
    //     awayName: 'Iran',
    //     homeScore: 3,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },

    //   {
    //     matchId: '227058155573225',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1780007600,
    //     status: 10,
    //     homeId: '904',
    //     homeName: 'Qatar',
    //     awayId: '779',
    //     awayName: 'Ecuador',
    //     homeScore: 8,
    //     awayScore: 8,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'A',
    //     location: 'Khalifa International',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 0,
    //       awayScore: 0,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 0,
    //       extraAwayScore: 0,
    //       penHomeScore: 0,
    //       penAwayScore: 0,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 0,
    //     },
    //   },
    //   {
    //     matchId: '26705812955986332',
    //     leagueId: '1572',
    //     leagueName: 'FIFA World Cup',
    //     leagueShortName: 'World Cup',
    //     matchTime: 1770007600,
    //     halfStartTime: 0,
    //     status: 10,
    //     homeId: '744',
    //     homeName: 'England',
    //     awayId: '783',
    //     awayName: 'Iran',
    //     homeScore: 2,
    //     awayScore: 2,
    //     homeHalfScore: 0,
    //     awayHalfScore: 0,
    //     homeRed: 0,
    //     awayRed: 0,
    //     homeYellow: 0,
    //     awayYellow: 0,
    //     homeCorner: 0,
    //     awayCorner: 0,
    //     homeRank: '',
    //     awayRank: '',
    //     season: '2022',
    //     stageId: '21534',
    //     round: 'Groups',
    //     group: 'B',
    //     extraExplain: {
    //       kickOff: 0,
    //       minute: 0,
    //       homeScore: 2,
    //       awayScore: 2,
    //       extraTimeStatus: 0,
    //       extraHomeScore: 1,
    //       extraAwayScore: 1,
    //       penHomeScore: 2,
    //       penAwayScore: 4,
    //       twoRoundsHomeScore: 0,
    //       twoRoundsAwayScore: 0,
    //       winner: 2,
    //     },
    //   },
    // ]; // eliminar

    // console.log(timeNow);

    let matches = [];
    let players = [];

    await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/schedule?api_key=50HwWqcS9KFDHBXK&leagueId=13014',
      )
      .then((res) => (matches = res.data.data)); //cambiar leagueId a 1572 y api_key

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
                // console.log('actualizando puntos fase de grupos');

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
        'http://api.isportsapi.com/sport/football/topscorer?api_key=50HwWqcS9KFDHBXK&leagueId=13014',
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
        'http://api.isportsapi.com/sport/football/schedule?api_key=50HwWqcS9KFDHBXK&leagueId=1572',
      )
      .then((res) => res.data);

    return res;
  }

  async getPlayersFromApi() {
    //cambiar leagueId y api_key
    const res = await this.httpService.axiosRef
      .get(
        'http://api.isportsapi.com/sport/football/topscorer?api_key=50HwWqcS9KFDHBXK&leagueId=13014',
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
