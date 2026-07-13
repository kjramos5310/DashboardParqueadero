package ec.edu.espe.usuarios.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreateRequest {

    @NotBlank(message = "DNI is required")
    @Size(max = 10, message = "DNI must be at most 10 characters")
    @Pattern(regexp = "^[0-9]+$", message = "DNI must contain only digits")
    private String dni;

    @NotBlank(message = "Fisrtname is required")
    @Size(max = 25, message = "Firstname must be at most 25 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Firstname must contain only letters and spaces")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Lastname is required")
    @Size(max = 25, message = "Lastname must be at most 25 characters")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Lastname must contain only letters and spaces")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Email must be at most 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    private String phone;
    private String address;
    private String nationality;
    private String password;

}
