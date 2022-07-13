import {Injectable} from '@nestjs/common';
import {User} from "../user/entities/user.entity";
import {hashPwd} from "../utils/hash-pwd";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {Response} from 'express';
import {v4 as uuid} from 'uuid'
import {sign} from "jsonwebtoken";
import {JwtPayload} from "./jwt.strategy";
import {UserService} from "../user/user.service";
import {userInfo} from "os";

require('dotenv').config({ path: './.env' })

export type userInfo = Omit<User, "password" | "currentTokenId">

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === hashPwd(pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
        const payload: JwtPayload = {id: currentTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, process.env.SECRET_KEY, {expiresIn})

        return {
            accessToken,
            expiresIn
        }
    }

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;

        do {
            token = uuid();
            userWithThisToken = await User.findOne({
                where: {currentTokenId: token}
            })
        } while (!!userWithThisToken)
        user.currentTokenId = token
        await user.save();

        return token
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {

        if (req.email == ''){
            return res.json({error: 'Invalid login data!'})
        }

        try {
            const user = await User.findOne({
                where: {
                    email: req.email,
                    password: hashPwd(req.password),
                }
            })

            if (!user) {
                return res.json({error: 'Invalid login data!'})
            }

            const token = this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false, //true podczas uzywania https, false na http(localhost)
                    domain: process.env.DATABASE_HOST,
                    httpOnly: true
                })
                .json({
                    ok: true,
                    token: token.accessToken
                })
        } catch (e) {
            return res.json({error: e.message});
        }
    }

    async logout(user: User, res: Response) {
        try {
            user.currentTokenId = null;
            await user.save();
            res.clearCookie('jwt',{
                secure: false,
                domain: process.env.DATABASE_HOST,
                httpOnly: true
            });
            return res.json({ok: true})
        } catch (e) {
            return res.json({error: e.message})
        }
    }

    async userInfo(user: User): Promise<userInfo> {
        const {password, currentTokenId, ...result} = await user
        console.log(result)
        console.log(userInfo)
        // @ts-ignore
        return result
    }
}