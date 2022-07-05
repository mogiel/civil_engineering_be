import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {FireProtectionDto} from "./dto/fire-protection.dto";

@Entity()
export class FireEntity extends BaseEntity implements FireProtectionDto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length:1
    })
    classBuilding: string;

    @Column({
        length: 12
    })
    main: string;

    @Column({
        length: 12
    })
    roof: string;

    @Column({
        length: 12
    })
    ceiling: string;

    @Column({
        length: 12
    })
    exteriorWall: string;

    @Column({
        length: 12
    })
    internalWall: string;

    @Column({
        length: 12
    })
    cover: string;
}