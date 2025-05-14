package pl.dmcs.services.auth;

import pl.dmcs.dto.SignupRequest;
import pl.dmcs.dto.UserDto;

public interface AuthService {

    UserDto signupUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);

}
