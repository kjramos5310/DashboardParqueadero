package ec.edu.espe.zonas.repository;

import ec.edu.espe.zonas.entity.Zona;
import ec.edu.espe.zonas.entity.TipoZona;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

public interface ZonaRepositorio extends JpaRepository<Zona, UUID> {

    Optional<Zona> findByNombre(String nombre);

    Optional<Zona> findByCodigo(String codigo);

    List<Zona> findByActiveTrue();

    List<Zona> findByTipo(TipoZona tipo);

    boolean existsByNombre(String nombre);

    boolean existsByCodigo(String codigo);

    long countByTipo(TipoZona tipo);
}
