import {Module} from '@nestjs/common';
import {SubsController} from './subs.controller';
import {SubsService} from './subs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChoiceSubEntity} from "./entities/choiceSub.entity";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";

@Module({

    imports: [
        UserModule,
        TypeOrmModule.forFeature([ChoiceSubEntity]),
    ],
    controllers: [SubsController],
    providers: [SubsService]
})
export class SubsModule {
}
