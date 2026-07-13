package ec.edu.espe.zonas.dto.response;

import ec.edu.espe.zonas.entity.TipoZona;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZonaResponseDto {

    private UUID id;
    private String nombre;
    private String codigo;
    private String descripcion;
    private int capacidad;
    private int espaciosDisponibles;
    private TipoZona tipo;
    private boolean active;
}
