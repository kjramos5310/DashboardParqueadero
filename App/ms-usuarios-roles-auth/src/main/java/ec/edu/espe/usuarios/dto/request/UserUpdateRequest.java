package ec.edu.espe.usuarios.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @NotBlank(message = "Firstname is required")
    @Size(max = 25)
    private String firstName;

    private String middleName;

    @NotBlank(message = "Lastname is required")
    @Size(max = 25)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private String address;
    private String nationality;
}
