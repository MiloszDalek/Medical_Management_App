package pl.dmcs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.entities.User;
import pl.dmcs.enums.UserRole;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String username);

    Optional<User> findByUserRole(UserRole userRole);
}
