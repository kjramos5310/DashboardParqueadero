package ec.edu.espe.usuarios.services;

import ec.edu.espe.usuarios.dto.request.RoleRequest;
import ec.edu.espe.usuarios.dto.response.RoleResponse;

import java.util.List;
import java.util.UUID;

public interface RoleService {
    RoleResponse createRole(RoleRequest roleRequest);
    List<RoleResponse> getRoles();
    RoleResponse getRoleById(UUID id);
    RoleResponse updateRole(UUID id, RoleRequest roleRequest);
    void deleteRole(UUID id);
}
