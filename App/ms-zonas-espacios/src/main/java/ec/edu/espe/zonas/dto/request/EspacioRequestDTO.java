package ec.edu.espe.zonas.dto.request;

import ec.edu.espe.zonas.entity.TipoEspacio;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EspacioRequestDTO {
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar vacio")
    private String nombre;

    private String codigo;

    private String descripcion;

    @NotNull(message = "El tipo de espacio no puede ser nulo")
    private TipoEspacio tipo;

    @NotNull(message = "El id de la zona no puede ser nulo")
    private UUID idZona;



}
