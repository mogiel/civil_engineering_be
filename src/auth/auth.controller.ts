import {Body, Controller, Delete, Get, Patch, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Response} from 'express'
import {AuthLoginDto} from "./dto/auth-login.dto";
import {UserObjDecorator} from "../decorators/user-obj.decorator";
import {sitePosition, User} from 'src/user/entities/user.entity';
import {JwtAuthGuard} from "./auth.guard";
import {Sub, UserReturn} from "../types";
import {Roles} from "../decorators/user-position.decorator";

@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/login')
    getHello(
        @UserObjDecorator() user: User,
    ): Promise<UserReturn> {
        return this.authService.userInfo(user)
    }

    @Post('/login')
    async userLogin(
        @Body() req: AuthLoginDto,
        @Res() res: Response
    ): Promise<any> {
        return this.authService.login(req, res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async userLogout(
        @UserObjDecorator() user: User,
        @Res() res: Response
    ): Promise<any> {
        return this.authService.logout(user, res)
    }

    @Roles(sitePosition.USER)
    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async userInfo(
        @UserObjDecorator() user: User
    ): Promise<UserReturn> {
        return this.authService.userInfo(user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/')
    async deleteUser(
        @UserObjDecorator() user: User,
        @Res() res: Response
    ): Promise<void> {
        return this.authService.deleteOne(user, res)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/sub')
    async userSub(
        @UserObjDecorator() user: User
    ): Promise<any> {
        return null
    }

    @UseGuards(JwtAuthGuard)
    @Get('/sub')
    async getUserSub(
        @UserObjDecorator() user: User
    ): Promise<Sub> {
        return await this.authService.getUserSub(user)
    }

}
