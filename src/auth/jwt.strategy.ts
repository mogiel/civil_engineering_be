import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy} from '@nestjs/passport'
import { Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "../user/entities/user.entity";

export interface JwtPayload {
    id: string;
}

// const cookieExtractor = (req: any): null | string => {
//     return (req && req.cookie) ? (req.cookie?.jwt ?? null) : null
//
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    async validate(payload: JwtPayload, done:(error, user) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false)
        }

        const user = await User.findOne({
            where: {
                currentTokenId: payload.id,
            }
        })

        if (!user) {
            return done(new UnauthorizedException(), false)
        }
        done(null, user)
    }
}