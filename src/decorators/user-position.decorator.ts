import {sitePosition} from "../user/entities/user.entity";
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles'
export const Roles = (...roles: sitePosition[]) => SetMetadata(ROLES_KEY, roles)