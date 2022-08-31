import {SetMetadata} from "@nestjs/common";
import { sitePosition } from "src/types/user/user.enum";

export const ROLES_KEY = 'roles'
export const Roles = (...roles: sitePosition[]) => SetMetadata(ROLES_KEY, roles)