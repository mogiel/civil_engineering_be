import {Controller, Get, UseGuards} from '@nestjs/common';
import {CalculationsForFireProtectionService} from "./calculations-for-fire-protection.service";
import {FireEntity} from "./fire.entity";
import {JwtAuthGuard} from "../auth/auth.guard";

@Controller('fire')
export class CalculationsForFireProtectionController {

    constructor(private readonly fireService: CalculationsForFireProtectionService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getHello(
    ): Promise<FireEntity[]> {

        return this.fireService.getHello()
    }
}
