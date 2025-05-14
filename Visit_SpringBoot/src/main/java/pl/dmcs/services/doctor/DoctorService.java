package pl.dmcs.services.doctor;

import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.UserDto;
import pl.dmcs.dto.VisitDto;

import java.util.List;

public interface DoctorService {

    List<UserDto> getAllUsers();

    VisitDto createVisit(VisitDto visitDto);

    List<VisitDto> getAllVisits();

    void deleteVisit(Long id);

    VisitDto updateVisit(Long id, VisitDto visitDto);

    List<VisitDto> searchVisitByTitle(String title);

    VisitDto getVisitById(Long id);

    InformationDto createInformation(Long visitId, Long postedBy, String content);

    List<InformationDto> getInformationsByVisitId(Long visitId);

    void deleteInformation(Long id);
}
