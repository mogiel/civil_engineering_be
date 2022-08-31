import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChoiceSubEntity} from "./entities/choiceSub.entity";

@Injectable()
export class SubsService {
    constructor(
        private usersService: UserService,
        @InjectRepository(ChoiceSubEntity)
        private readonly subChoiceRepository: Repository<ChoiceSubEntity>
    ) {
    }

    async getAll() {
        return await this.subChoiceRepository.find({
            select: ['days', 'price']
        });
    }

    subscriptionsBuy(req) {
        console.log(req)
        return {
            ok: true
        }
    }
}
