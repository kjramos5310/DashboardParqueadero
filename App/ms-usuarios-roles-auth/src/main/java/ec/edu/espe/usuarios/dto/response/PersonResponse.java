package ec.edu.espe.usuarios.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@JsonPropertyOrder(alphabetic = true)
public class PersonResponse {
    private UUID id;
    private String dni;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String nationality;
    private Boolean active;
}
