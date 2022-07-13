
import {IsEmail, IsNotEmpty} from "class-validator";

export class UserDto{
    @IsNotEmpty() id: string;
    @IsNotEmpty() username: string;
    @IsNotEmpty() @IsEmail() email: string;
    @IsNotEmpty() password: string;
    currentTokenId: string | null;
    position: string;
}

export type UserDtoSafe = Omit<UserDto, "password" | "currentTokenId" | "position">