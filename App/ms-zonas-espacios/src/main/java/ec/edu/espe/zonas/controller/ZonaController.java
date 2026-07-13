package ec.edu.espe.zonas.controller;

import ec.edu.espe.zonas.dto.request.ZonaRequestDto;
import ec.edu.espe.zonas.dto.response.ZonaResponseDto;
import ec.edu.espe.zonas.services.interfaz.ZonaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/zonas")
@RequiredArgsConstructor
public class ZonaController {

    private final ZonaService zonaService;
    // Patrón de diseño Proxy: el controlador accede únicamente a la interfaz ZonaService, 
    // protegiendo la implementación real (ServiciosZona) y permitiendo a Spring interceptar con transacciones.

    @GetMapping
    public ResponseEntity<List<ZonaResponseDto>> listarZonas() {
        return ResponseEntity.ok(zonaService.listarZonas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZonaResponseDto> obtenerZonaPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(zonaService.obtenerZonaPorId(id));
    }

    @PostMapping
    public ResponseEntity<ZonaResponseDto> crearZona(@Valid @RequestBody ZonaRequestDto dto) {
        return new ResponseEntity<>(zonaService.crearZona(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ZonaResponseDto> actualizarZona(@PathVariable UUID id, @Valid @RequestBody ZonaRequestDto dto) {
        return ResponseEntity.ok(zonaService.actualizarZona(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarZona(@PathVariable UUID id) {
        zonaService.eliminarZona(id);
        return ResponseEntity.noContent().build();
    }
}
