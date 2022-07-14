import {User} from "../user/entities/user.entity";
import {UserDtoSafe} from "../user/dto/user.dto";

export const toUserDto = (data: User): UserDtoSafe => {
    const {id, email, username, position} = data;
    return {id, email, username, position};
};