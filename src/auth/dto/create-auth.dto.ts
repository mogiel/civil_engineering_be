import {CreateAuth} from "../../types";

export class CreateAuthDto implements CreateAuth{
    username: string;
    email: string;
    password: string;
}
