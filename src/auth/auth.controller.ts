import {Controller, Post, Body, Res, UseGuards, Get} from '@nestjs/common';
import {AuthService} from './auth.service';
import { Response } from 'express'
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UserObjDecorator} from "../decorators/user-obj.decorator";
import { User } from 'src/user/entities/user.entity';
import {JwtAuthGuard} from "./auth.guard";
import {UserReturn} from "../types";

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  getHello(
      @UserObjDecorator() user: User,
  ): Promise<UserReturn> {
    console.log(user)
    return this.authService.userInfo(user)
  }

  @Post('/login')
  async userLogin(
      @Body() req: AuthLoginDto,
      @Res() res: Response
  ):Promise<any> {
    console.log('weszło w login post')
    return this.authService.login(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async userLogout(
      @UserObjDecorator() user: User,
      @Res() res: Response
  ):Promise<any> {
    return this.authService.logout(user, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/info')
  async userInfo(
      @UserObjDecorator() user: User
  ):Promise<UserReturn> {
    console.log(user)
    return this.authService.userInfo(user)
  }

}
