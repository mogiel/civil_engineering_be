import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserDto} from "../dto/user.dto";

enum sitePosition {
    ADMIN= 'admin',
    USER='user',
    USER_SUB='userSubscription'
}

@Entity()
export class User extends BaseEntity implements UserDto{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "varchar",
        length:255,
        nullable: false,
    })
    username: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length:255,
    })
    email: string

    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string

    @Column({
        nullable:true,
        default:null,
    })
    currentTokenId: string | null

    @Column({
        type:"enum",
        enum: sitePosition,
        default: sitePosition.USER
    })
    position: sitePosition

}
