package pl.dmcs.services.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();

}
