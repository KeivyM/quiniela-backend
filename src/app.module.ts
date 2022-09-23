import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuinielaModule } from './quiniela/quiniela.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    // UsersModule,
    AuthModule,
    QuinielaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
