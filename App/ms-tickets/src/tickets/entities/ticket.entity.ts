import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    placa!: string;

    @Column()
    dni!: string;

    // zona solo como referencia
    @Column({ type: 'uuid' })
    idEspacio!: string;

    @Column()
    nombreZona!: string;

    @Column()
    fechaHoraIngreso!: Date;
    @Column({ nullable: true })
    fechaHoraSalida?: Date;

    @Column({ type: 'float', nullable: true })
    valorRecaudado?: number;

    @Column()
    activo!: boolean;

    //logs
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
