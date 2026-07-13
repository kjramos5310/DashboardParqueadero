package ec.edu.espe.zonas.dto.request;

import ec.edu.espe.zonas.entity.TipoZona;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZonaRequestDto {

    @NotNull(message = "El nombre de la zona no puede ser nulo")
    @NotBlank(message = "El nombre de la zona no puede ser vacio")
    private String nombre;

    private String codigo;

    private String descripcion;

    @NotNull(message = "La capacidad es un campo obligatorio")
    @Min(value = 1, message = "La capacidad debe ser un numero positivo")
    @Max(value = 200, message = "La capacidad debe ser un numero menor o igual a 200")
    private Integer capacidad;

    @NotNull(message = "El tipo de zona no puede ser nulo")
    private TipoZona tipo;
}
