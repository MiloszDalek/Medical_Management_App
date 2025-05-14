package pl.dmcs.services.patient;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.entities.Information;
import pl.dmcs.entities.User;
import pl.dmcs.entities.Visit;
import pl.dmcs.enums.VisitStatus;
import pl.dmcs.repositories.InformationRepository;
import pl.dmcs.repositories.UserRepository;
import pl.dmcs.repositories.VisitRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final VisitRepository visitRepository;

    private final UserRepository userRepository;

    private final InformationRepository informationRepository;

    @Override
    public List<VisitDto> getVisitsByUserId(Long id) {
        return visitRepository.findByUserId(id).stream().sorted(Comparator.comparing(Visit::getDueDate).reversed())
                .map(Visit::getVisitDto).collect(Collectors.toList());
    }

    @Override
    public VisitDto updateVisit(Long visitId, String status) {
        Optional<Visit> optionalVisit = visitRepository.findById(visitId);
        if (optionalVisit.isPresent()) {
            Visit existingVisit = optionalVisit.get();
            VisitStatus newStatus = mapStringToVisitStatus(status);
            existingVisit.setVisitStatus(newStatus);
            return visitRepository.save(existingVisit).getVisitDto();
        }
        return null;
    }

    private VisitStatus mapStringToVisitStatus(String statusString) {
        if (Objects.equals(statusString, "CONFIRMED"))
            return VisitStatus.CONFIRMED;
        else
            return VisitStatus.CANCELLED;

    }

    @Override
    public VisitDto getVisitById(Long id) {
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        return optionalVisit.map(Visit::getVisitDto).orElse(null);
    }

    @Override
    public InformationDto createInformation(Long visitId, Long postedBy, String content) {
        Optional<Visit> optionalVisit = visitRepository.findById(visitId);
        Optional<User> optionalUser = userRepository.findById(postedBy);
        if(optionalVisit.isPresent() && optionalUser.isPresent()){
            Information information = new Information();
            information.setVisit(optionalVisit.get());
            information.setContent(content);
            information.setUser(optionalUser.get());
            information.setCreationDate(new Date());
            return informationRepository.save(information).getInformationDto();
        }
        throw new EntityNotFoundException("User or Visit not found");
    }

    @Override
    public List<InformationDto> getInformationsByVisitId(Long visitId) {
        return informationRepository.findByVisitId(visitId).stream().map(Information::getInformationDto).collect(Collectors.toList());
    }

    @Override
    public void deleteInformation(Long id) {
        informationRepository.deleteById(id);
    }
}
