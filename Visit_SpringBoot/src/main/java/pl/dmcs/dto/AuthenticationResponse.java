package pl.dmcs.dto;

import lombok.Data;
import pl.dmcs.enums.UserRole;

@Data
public class AuthenticationResponse {

    private String jwt;

    private Long userId;

    private UserRole userRole;

}
