package pl.dmcs.services.auth;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.dmcs.dto.SignupRequest;
import pl.dmcs.dto.UserDto;
import pl.dmcs.entities.User;
import pl.dmcs.enums.UserRole;
import pl.dmcs.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @PostConstruct
    public void createAnDoctorAccount() {
        Optional<User> doctorAccount = userRepository.findByUserRole(UserRole.DOCTOR);
        if (doctorAccount.isEmpty()) {
            User user = new User();
            user.setEmail("doctor@admin.com");
            user.setName("Doctor");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setUserRole(UserRole.DOCTOR);
            userRepository.save(user);
            System.out.println("Admin account created successfully");
        } else {
            System.out.println("Admin account already exist");
        }
    }


    @Override //@Transactional
    public UserDto signupUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.PATIENT);
        User createdUser = userRepository.save(user);
        return createdUser.getUserDto();
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
