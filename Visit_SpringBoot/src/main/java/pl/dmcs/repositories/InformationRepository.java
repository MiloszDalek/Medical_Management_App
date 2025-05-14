package pl.dmcs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.entities.Information;

import java.util.List;

@Repository
public interface InformationRepository extends JpaRepository<Information, Long> {

    List<Information> findByVisitId(Long visitId);
}
