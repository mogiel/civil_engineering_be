import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FireEntity} from "./fire.entity";
import {Repository} from "typeorm";

@Injectable()
export class CalculationsForFireProtectionService {

    constructor(
        @InjectRepository(FireEntity) private fireRepository: Repository<FireEntity>
    ) {
    }

    async getHello(): Promise<FireEntity[]> {
        return await FireEntity.find()
    }
}
