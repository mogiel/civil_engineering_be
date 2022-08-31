import {Injectable, ExecutionContext} from '@nestjs/common';
import {AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import {sitePosition, User} from '../user/entities/user.entity';
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/user-position.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    public handleRequest(err: unknown, user: User): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const requiredRoles = this.reflector.getAllAndOverride<sitePosition[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        const {user}: Request = context.switchToHttp().getRequest();

        if(!requiredRoles) {
            return !!user
        }

        return requiredRoles.includes(user["position"]);
    }
}