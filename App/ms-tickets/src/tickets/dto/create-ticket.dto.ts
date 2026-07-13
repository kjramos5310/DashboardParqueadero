import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    placa!: string;

    @IsString()
    @IsNotEmpty()
    dni!: string;

    @IsString()
    @IsNotEmpty()
    idEspacio!: string;

    @IsString()
    @IsNotEmpty()
    nombreZona!: string;
}
