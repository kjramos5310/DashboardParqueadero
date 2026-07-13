package ec.edu.espe.usuarios.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@JsonPropertyOrder(alphabetic = true)
public class UserResponse {
    private UUID id;
    private String username;
    private Boolean active;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private PersonResponse person;
    private List<String> roles;
}
