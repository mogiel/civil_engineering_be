import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {SubsService} from "./subs.service";
import {JwtAuthGuard} from "../auth/auth.guard";

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
        @Body() req
): Promise<any> {
        return this.subsService.subscriptionsBuy(req)
}


}
