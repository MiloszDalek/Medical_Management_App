package pl.dmcs.services.patient;

import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.entities.Visit;

import java.util.List;

public interface PatientService {

    List<VisitDto> getVisitsByUserId(Long id);

    VisitDto updateVisit(Long visitId, String status);

    VisitDto getVisitById(Long id);

    InformationDto createInformation(Long visitId, Long postedBy, String content);

    List<InformationDto> getInformationsByVisitId(Long visitId);

    void deleteInformation(Long id);
}
