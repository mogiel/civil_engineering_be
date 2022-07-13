import {Controller, Post, Body, Res, UseGuards, Get, Request} from '@nestjs/common';
import {AuthService, userInfo} from './auth.service';
import { Response } from 'express'
import {AuthLoginDto} from "./dto/auth-login.dto";
import {AuthGuard} from "@nestjs/passport";
import {UserObjDecorator} from "../decorators/user-obj.decorator";
import { User } from 'src/user/entities/user.entity';
import {JwtAuthGuard} from "./auth.guard";
import {LocalAuthGuard} from "./local.auth.guard";

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  getHello(
      @UserObjDecorator() user: User,
  ): Promise<userInfo> {
    return this.authService.userInfo(user)
  }

  @Post('/login')
  async userLogin(
      // @Request() req
      @Body() req: AuthLoginDto,
      @Res() res: Response
  ):Promise<any> {
    return this.authService.login(req, res)
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  async userLogout(
      @UserObjDecorator() user: User,
      @Res() res: Response
  ):Promise<any> {
    return this.authService.logout(user, res)
  }

}
