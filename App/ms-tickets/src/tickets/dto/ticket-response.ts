import { IsNotEmpty, IsString } from "class-validator";

export class TicketResponseDto {
    id!: string;
    placa!: string;
    dni!: string;
    idEspacio!: string;
    datosPersona?: string;
    nombreZona!: string;
    fechaHoraIngreso!: Date;
    fechaHoraSalida!: Date;
    valorRecaudado!: number;
    tiempoHoras!: number;
    activo!: boolean;
}
