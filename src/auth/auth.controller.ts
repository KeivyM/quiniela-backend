import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from 'src/decorators/raw-headers.decorator';
import { IncomingHttpHeaders } from 'http';
import { AddPointsDto } from './dto/add-points.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @UseGuards(AuthGuard())
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    // @RawHeaders() rawHeaders: string[],//decorador personalizado que obtiene los headers
    @Headers() headers: IncomingHttpHeaders, // decorador de nest que obtine los headers
  ) {
    return {
      msg: 'Ruta privada',
      user,
      userEmail,
      headers,
      // rawHeaders,
    };
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Post('addPoints')
  addPoints(@Body() body: AddPointsDto) {
    return this.authService.addPoints(body);
  }

  @Post('resetPoints')
  resetPoints(@Body() body) {
    return this.authService.resetPoints(body);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Post(':id')
  remove(@Param('id') id: string, @Body() passwordUser) {
    return this.authService.remove(id, passwordUser);
  }
}
