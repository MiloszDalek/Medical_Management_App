package pl.dmcs.dto;

import lombok.Data;
import pl.dmcs.enums.UserRole;

@Data
public class UserDto {

    private Long id;

    private String name;

    private String email;

    private UserRole userRole;

}
