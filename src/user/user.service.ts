import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {UserDto, UserDtoSafe} from "./dto/user.dto";
import {toUserDto} from "../shared/mapper";
import {hashPwd} from "../utils/hash-pwd";
import {SubscriptionEntity} from "./entities/subscription.entity";
import {sitePosition} from "../types";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(SubscriptionEntity)
        private readonly subRepository: Repository<SubscriptionEntity>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<UserDtoSafe> {
        const {username, password, email} = createUserDto;

        const emailInDb = await this.userRepository.findOne({
            where: {email},
        });

        if (emailInDb && email === '') {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepository.create({username, email, password: hashPwd(password)});
        await this.userRepository.save(user);
        const sub: SubscriptionEntity = await this.subRepository.create({user: user})
        await this.subRepository.save(sub)

        return toUserDto(user);
    }

    async deleteUser(user: User) {
        return await this.userRepository.remove(user)
    }

    async findOne(username: string): Promise<UserDto | undefined> {
        return await this.userRepository.findOne({
            where: {username: username}
        });
    }

    async changeSubs(req) {
        await this.userRepository.update({
                id: req.data
            },
            {
                position: sitePosition.USER_SUB
            })
    }
}
