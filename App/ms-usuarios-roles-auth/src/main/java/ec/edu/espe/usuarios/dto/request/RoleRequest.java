package ec.edu.espe.usuarios.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RoleRequest {
    @NotBlank(message = "Role name is required")
    @Size(max = 25, message = "Role name must be at most 25 characters")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;
}
