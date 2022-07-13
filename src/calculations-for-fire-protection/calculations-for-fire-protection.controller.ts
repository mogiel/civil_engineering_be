import {Controller, Get, UseGuards} from '@nestjs/common';
import {CalculationsForFireProtectionService} from "./calculations-for-fire-protection.service";
import {FireEntity} from "./fire.entity";
import {AuthGuard} from "@nestjs/passport";
import {UserObjDecorator} from "../decorators/user-obj.decorator";
import {User} from "../user/entities/user.entity";

@Controller('fire')
export class CalculationsForFireProtectionController {

    constructor(private readonly fireService: CalculationsForFireProtectionService) {
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/')
    getHello(
        // @UserObjDecorator() user: User,
    ): Promise<FireEntity[]> {
        // console.log(user)
        return this.fireService.getHello()
    }
}
