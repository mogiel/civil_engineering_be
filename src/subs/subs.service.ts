import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Repository} from "typeorm";
import {ChoiceSubEntity} from "./entities/choiceSub.entity";

@Injectable()
export class SubsService {
    constructor(
        private usersService: UserService,
        @InjectRepository(ChoiceSubEntity)
        private readonly subChoiceRepository: Repository<ChoiceSubEntity>,
    ) {
    }

    async getAll() {
        return await this.subChoiceRepository.find({
            select: ['days', 'price']
        });
    }

    async subscriptionsBuy(user, req) {
        const priceArray = await this.subChoiceRepository.find({
            select: ['days', "price"],
            where: {
                days: Equal(req.date)
            }
        })

        if (priceArray) {
            return {
                id: user.id,
                price: priceArray[0].price
            }
        }

        return {
            ok: false
        }
    }

    async changeSubs(req) {
        const days = await this.subChoiceRepository.findOne({
            select: {
                days: true
            },
            where: {
                price: req.price
            }
        })

        await this.usersService.changeSubs(req.id, days.days)

        return {
            status: true
        }
    }
}
