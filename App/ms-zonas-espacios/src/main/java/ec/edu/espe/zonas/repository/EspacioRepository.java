package ec.edu.espe.zonas.repository;

import ec.edu.espe.zonas.entity.EstadoEspacio;
import ec.edu.espe.zonas.entity.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EspacioRepository extends JpaRepository<Espacio, UUID> {

    List<Espacio> findByZonaId(UUID idZona);

    List<Espacio> findByZonaIdAndEstado(UUID idZona, EstadoEspacio estado);

    List<Espacio> findByEstado(EstadoEspacio estado);

    boolean existsByNombre(String nombre);

    boolean existsByCodigo(String codigo);

    @Query("SELECT e FROM Espacio e JOIN FETCH e.zona WHERE e.estado = :estado")
    List<Espacio> findByEstadoWithZona(@Param("estado") EstadoEspacio estado);
}

