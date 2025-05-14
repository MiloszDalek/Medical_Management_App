package pl.dmcs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.entities.Visit;

import java.util.List;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findAllByTitleContaining(String title);

    List<Visit> findByUserId(Long id);
}
