import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserDto} from "../dto/user.dto";
import {SubscriptionEntity} from "./subscription.entity"

enum sitePosition {
    ADMIN = 'admin',
    USER = 'user',
    USER_SUB = 'userSubscription'
}

@Entity()
export class User extends BaseEntity implements UserDto {
    @PrimaryColumn({type: "uuid", default: () => "uuid()"})
    @Generated("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
    })
    username: string

    @Column({
        type: "varchar",
        nullable: false,
        unique: true,
        length: 100,
    })
    email: string

    @Column({
        type: "varchar",
        length: 128,
        nullable: false,
    })
    password: string

    @Column({
        nullable: true,
        length: 36,
        default: null,
    })
    currentTokenId: string | null

    @Column({
        type: "enum",
        enum: sitePosition,
        default: sitePosition.USER
    })
    position: sitePosition

    @OneToOne(() => SubscriptionEntity, sub => sub.user)
    sub: SubscriptionEntity

}
