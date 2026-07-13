import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

export enum Clasificacion {
    ELECTRICO = 'ELECTRICO',
    GASOLINA = 'GASOLINA',
    DIESEL = 'DIESEL',
    HIBRIDO = 'HIBRIDO',
    HIBRIDO_ENCHUFABLE = 'HIBRIDO_ENCHUFABLE',
}


@Entity()
@TableInheritance({ column: { name: 'tipo', type: 'varchar' } })
export abstract class Vehiculo {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    placa!: string;

    @Column()
    marca!: string;

    @Column()
    modelo!: string;

    @Column()
    color!: string;

    @Column({ nullable: true })
    clasificacion?: string;

    abstract obtenerTipo(): string;

}
