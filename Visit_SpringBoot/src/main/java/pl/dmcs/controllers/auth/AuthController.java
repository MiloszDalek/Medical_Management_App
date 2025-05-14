package pl.dmcs.controllers.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.dto.AuthenticationRequest;
import pl.dmcs.dto.AuthenticationResponse;
import pl.dmcs.dto.SignupRequest;
import pl.dmcs.dto.UserDto;
import pl.dmcs.entities.User;
import pl.dmcs.repositories.UserRepository;
import pl.dmcs.services.auth.AuthService;
import pl.dmcs.services.jwt.UserService;
import pl.dmcs.utils.JwtUtil;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) throws Exception {

        if (authService.hasUserWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("User already exists with this email", HttpStatus.NOT_ACCEPTABLE);

        UserDto signedUpUser = authService.signupUser(signupRequest);
        if (signedUpUser == null)
            return new ResponseEntity<>("User not created, come again later", HttpStatus.NOT_ACCEPTABLE);

        return new ResponseEntity<>(signedUpUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;
    }

}
