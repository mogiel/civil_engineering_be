import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {SubsService} from "./subs.service";
import {JwtAuthGuard} from "../auth/auth.guard";
import {UserObjDecorator} from "../decorators/user-obj.decorator";
import {User} from "../user/entities/user.entity";

@Controller('subs')
export class SubsController {
    constructor(private readonly subsService: SubsService) {
    }

    @Get('/')
    async getAllSubs() {
        return this.subsService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Post('/buy')
    async subscriptionsBuy(
        @Body() req: Request,
        @UserObjDecorator() user: User
    ): Promise<any> {
        return this.subsService.subscriptionsBuy(user, req)
    }

    @Post('/')
    async changeSubs(
        @Body() req: Request
    ):Promise<any> {
        return this.subsService.changeSubs(req)
    }


}
