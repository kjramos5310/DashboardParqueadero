package ec.edu.espe.usuarios.services.impl;

import ec.edu.espe.usuarios.dto.request.RoleRequest;
import ec.edu.espe.usuarios.dto.response.RoleResponse;
import ec.edu.espe.usuarios.entity.Role;
import ec.edu.espe.usuarios.repository.RoleRepository;
import ec.edu.espe.usuarios.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public RoleResponse createRole(RoleRequest roleRequest) {
        // Sanitizamos el nombre: le quitamos espacios extra y lo convertimos a MAYUSCULAS (estándar para roles)
        String sanitizedName = roleRequest.getName().trim().toUpperCase();

        if (roleRepository.findByNameIgnoreCase(sanitizedName).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre del rol ya existe");
        }

        Role role = Role.builder()
                .name(sanitizedName)
                .description(roleRequest.getDescription())
                .active(true)
                .build();

        Role savedRole = roleRepository.save(role);
        return mapToRoleResponse(savedRole);
    }

    @Override
    public List<RoleResponse> getRoles() {
        return roleRepository.findAll().stream()
                .map(this::mapToRoleResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponse getRoleById(UUID id) {
        return roleRepository.findById(id)
                .map(this::mapToRoleResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rol no encontrado"));
    }

    @Override
    @Transactional
    public RoleResponse updateRole(UUID id, RoleRequest roleRequest) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rol no encontrado"));

        // Sanitizamos el nombre
        String sanitizedName = roleRequest.getName().trim().toUpperCase();

        if (!role.getName().equalsIgnoreCase(sanitizedName) && 
            roleRepository.findByNameIgnoreCase(sanitizedName).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El nombre del rol ya existe");
        }

        role.setName(sanitizedName);
        role.setDescription(roleRequest.getDescription());

        Role updatedRole = roleRepository.save(role);
        return mapToRoleResponse(updatedRole);
    }

    @Override
    @Transactional
    public void deleteRole(UUID id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rol no encontrado"));
        role.setActive(false);
        roleRepository.save(role);
    }

    private RoleResponse mapToRoleResponse(Role role) {
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .active(role.getActive())
                .createdAt(role.getCreatedAt())
                .build();
    }
}
