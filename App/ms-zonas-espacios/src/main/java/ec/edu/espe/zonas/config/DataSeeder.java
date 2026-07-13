package ec.edu.espe.zonas.config;

import ec.edu.espe.zonas.entity.Espacio;
import ec.edu.espe.zonas.entity.EstadoEspacio;
import ec.edu.espe.zonas.entity.TipoEspacio;
import ec.edu.espe.zonas.entity.TipoZona;
import ec.edu.espe.zonas.entity.Zona;
import ec.edu.espe.zonas.repository.EspacioRepository;
import ec.edu.espe.zonas.repository.ZonaRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Siembra zonas y espacios de ejemplo la primera vez que arranca el servicio
 * (solo si la tabla de zonas esta vacia) para que el dashboard muestre datos.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ZonaRepositorio zonaRepositorio;
    private final EspacioRepository espacioRepository;

    @Override
    public void run(String... args) {
        if (zonaRepositorio.count() > 0) {
            return;
        }

        Zona vip = zonaRepositorio.save(Zona.builder()
                .nombre("Zona VIP")
                .codigo("ZON-VIP")
                .descripcion("Zona preferencial")
                .capacidad(10)
                .tipo(TipoZona.VIP)
                .build());

        Zona general = zonaRepositorio.save(Zona.builder()
                .nombre("Zona General")
                .codigo("ZON-GEN")
                .descripcion("Zona general")
                .capacidad(20)
                .tipo(TipoZona.GENERAL)
                .build());

        crearEspacio(vip, "ZON-VIP-01", TipoEspacio.AUTO, EstadoEspacio.DISPONIBLE);
        crearEspacio(vip, "ZON-VIP-02", TipoEspacio.AUTO, EstadoEspacio.OCUPADO);
        crearEspacio(vip, "ZON-VIP-03", TipoEspacio.MOTO, EstadoEspacio.RESERVADO);
        crearEspacio(general, "ZON-GEN-01", TipoEspacio.AUTO, EstadoEspacio.DISPONIBLE);
        crearEspacio(general, "ZON-GEN-02", TipoEspacio.AUTO, EstadoEspacio.DISPONIBLE);
        crearEspacio(general, "ZON-GEN-03", TipoEspacio.MOTO, EstadoEspacio.OCUPADO);
        crearEspacio(general, "ZON-GEN-04", TipoEspacio.CAMION, EstadoEspacio.DISPONIBLE);
    }

    private void crearEspacio(Zona zona, String codigo, TipoEspacio tipo, EstadoEspacio estado) {
        espacioRepository.save(Espacio.builder()
                .nombre(codigo)
                .codigo(codigo)
                .descripcion("Espacio " + codigo)
                .tipo(tipo)
                .estado(estado)
                .zona(zona)
                .build());
    }
}
