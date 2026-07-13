package ec.edu.espe.zonas.dto.response;

import ec.edu.espe.zonas.entity.EstadoEspacio;
import ec.edu.espe.zonas.entity.TipoEspacio;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EspacioResponseDto {
    private UUID id;
    private String nombre;
    private String codigo;
    private String descripcion;
    private TipoEspacio tipo;
    private EstadoEspacio estado;
    private boolean active;
    private String nombreZona;
    private UUID idZona;
}
