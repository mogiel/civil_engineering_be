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
import {User} from "./user.entity";

@Entity()
export class SubscriptionEntity extends BaseEntity {
    @PrimaryColumn({type: "uuid", default: () => "uuid()"})
    @Generated("uuid")
    id: string

    @Column({
        type: 'timestamp',
        default: null
    })
    subs_term: Date

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @Column({
        type: "bool",
        nullable: false,
        default: true,
    })
    free_day: boolean

    @OneToOne(() => User, user => user.sub,{ onDelete: 'CASCADE'})
    @JoinColumn()
    user: User
}