import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ChoiceSubEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        type:"smallint"
    })
    days: number

    @Column("decimal",{
        precision: 5,
        scale: 2,
        default: 0
    })
    price: number
}
