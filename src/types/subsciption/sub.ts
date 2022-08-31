import { sitePosition } from "../../user/entities/user.entity";

export interface Sub {
    id: string;
    position: sitePosition
    sub: {
        subs_term: Date;
        created_at: Date;
        free_day: boolean
    }
}