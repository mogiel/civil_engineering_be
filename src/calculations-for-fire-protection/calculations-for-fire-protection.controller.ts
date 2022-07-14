import {Controller, Get} from '@nestjs/common';
import {CalculationsForFireProtectionService} from "./calculations-for-fire-protection.service";
import {FireEntity} from "./fire.entity";

@Controller('fire')
export class CalculationsForFireProtectionController {

    constructor(private readonly fireService: CalculationsForFireProtectionService) {
    }

    @Get('/')
    getHello(
    ): Promise<FireEntity[]> {
        return this.fireService.getHello()
    }
}
