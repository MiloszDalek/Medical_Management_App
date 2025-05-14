package pl.dmcs.services.doctor;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.UserDto;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.entities.Information;
import pl.dmcs.entities.Visit;
import pl.dmcs.enums.UserRole;
import pl.dmcs.entities.User;
import pl.dmcs.enums.VisitStatus;
import pl.dmcs.repositories.InformationRepository;
import pl.dmcs.repositories.UserRepository;
import pl.dmcs.repositories.VisitRepository;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final UserRepository userRepository;

    private final VisitRepository visitRepository;

    private final InformationRepository informationRepository;


    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRole() == UserRole.PATIENT)
                .map(User::getUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public VisitDto createVisit(VisitDto visitDto) {
        Optional<User> optionalUser = userRepository.findById(visitDto.getPatientId());
        if (optionalUser.isPresent()) {
            Visit visit = new Visit();
            visit.setTitle(visitDto.getTitle());
            visit.setDescription(visitDto.getDescription());
            visit.setPriority(visitDto.getPriority());
            visit.setDueDate(visitDto.getDueDate());
            visit.setUser(optionalUser.get());
            visit.setVisitStatus(VisitStatus.SCHEDULED);
            return visitRepository.save(visit).getVisitDto();
        } else {
            return null;
        }
    }

    private VisitStatus mapStringToVisitStatus(String statusString) {
        return switch (statusString) {
            case "SCHEDULED" -> VisitStatus.SCHEDULED;
            case "CONFIRMED" -> VisitStatus.CONFIRMED;
            default -> VisitStatus.CANCELLED;
        };
    }

    @Override
    public List<VisitDto> getAllVisits() {
        return visitRepository.findAll().stream().sorted(Comparator.comparing(Visit::getDueDate)
                .reversed()).map(Visit::getVisitDto).collect(Collectors.toList());
    }

    @Override
    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    @Override
    public VisitDto getVisitById(Long id) {
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        return optionalVisit.map(Visit::getVisitDto).orElse(null);
    }

    @Override
    public VisitDto updateVisit(Long id, VisitDto visitDto) {
        Optional<Visit> optionalVisit = visitRepository.findById(id);
        Optional<User> optionalUser = userRepository.findById(visitDto.getPatientId());
        if (optionalVisit.isPresent() && optionalUser.isPresent()){
            Visit existingVisit = optionalVisit.get();
            existingVisit.setTitle(visitDto.getTitle());
            existingVisit.setDescription(visitDto.getDescription());
            existingVisit.setDueDate(visitDto.getDueDate());
            existingVisit.setPriority(visitDto.getPriority());
            existingVisit.setUser(optionalUser.get());
            VisitStatus visitStatus = mapStringToVisitStatus(String.valueOf(visitDto.getVisitStatus()));
            existingVisit.setVisitStatus(visitStatus);
            return visitRepository.save(existingVisit).getVisitDto();
        }
        return null;
    }

    @Override
    public List<VisitDto> searchVisitByTitle(String title) {
        return visitRepository.findAllByTitleContaining(title).stream().sorted(Comparator.comparing(Visit::getDueDate).reversed()).map(Visit::getVisitDto).collect(Collectors.toList());
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
