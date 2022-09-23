import { Module } from '@nestjs/common';
import { QuinielaService } from './quiniela.service';
import { QuinielaController } from './quiniela.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiniela, QuinielaSchema } from './entities/quiniela.entity';

@Module({
  controllers: [QuinielaController],
  providers: [QuinielaService],
  exports: [QuinielaService],
  imports: [
    MongooseModule.forFeature([
      { name: Quiniela.name, schema: QuinielaSchema }, //esto arreglo el error
    ]),
  ],
})
export class QuinielaModule {}
