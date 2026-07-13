export abstract class ResponseVehiculoDto {
    id!: string;
    placa!: string;
    marca!: string;
    modelo!: string;
    color!: string;
    anio!: number;
    tipo!: string;
    clasificacion!: string;
    numeroPuertas?: number;
    capacidadMaletero?: number;
    cilindraje?: number;
    cabina?: string;
    capacidadCarga?: number;
    tipoManubrio?: string;
}

// export class ResponseAutoDto extends ResponseVehiculoDto {
//     numeroPuertas!: number;
//     capacidadMaletero!: number;
// }

// export class ResponseCamionetaDto extends ResponseVehiculoDto {
//     cilindraje!: number;
//     cabina!: string;
//     capacidadCarga!: number;
// }

// export class ResponseMotocicletaDto extends ResponseVehiculoDto {
//     cilindraje!: number;
//     tipoManubrio!: string;
//     tipo!: string;
// }