package pl.dmcs.controllers.patient;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.services.patient.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/visits/{id}")
    public ResponseEntity<List<VisitDto>> getVisitsByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getVisitsByUserId(id));
    }

    @GetMapping("/visit/{visitId}/{status}")
    public ResponseEntity<VisitDto> updateVisit(@PathVariable Long visitId, @PathVariable String status) {
        VisitDto updatedVisit = patientService.updateVisit(visitId, status);
        if(updatedVisit != null)
            return ResponseEntity.ok(updatedVisit);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/visit/{id}")
    public ResponseEntity<VisitDto> getVisitById(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(patientService.getVisitById(id, authentication.getName()));
    }

    @PostMapping("/visit/information")
    public ResponseEntity<?> createInformation(@RequestParam Long visitId, @RequestParam Long postedBy, @RequestParam String content){
        try {
            return ResponseEntity.ok(patientService.createInformation(visitId, postedBy, content));

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @GetMapping("/visit/informations/{visitId}")
    public ResponseEntity<List<InformationDto>> getInformationsByVisitId(@PathVariable Long visitId) {
        return ResponseEntity.ok(patientService.getInformationsByVisitId(visitId));
    }

    @DeleteMapping("/visit/information/delete/{id}")
    public ResponseEntity<Void> deleteInformation(@PathVariable Long id) {
        patientService.deleteInformation(id);
        return ResponseEntity.ok(null);
    }
}
