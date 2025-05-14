package pl.dmcs.controllers.doctor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.dto.InformationDto;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.services.doctor.DoctorService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctor")
@CrossOrigin("*")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(doctorService.getAllUsers());
    }

    @PostMapping("/visit")
    public ResponseEntity<VisitDto> createVisit(@RequestBody VisitDto visitDto) {
        VisitDto createdVisitDto = doctorService.createVisit(visitDto);
        if (createdVisitDto != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVisitDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/visits")
    public ResponseEntity<?> getAllVisits() {
        return ResponseEntity.ok(doctorService.getAllVisits());
    }

    @DeleteMapping("/visit/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        doctorService.deleteVisit(id);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/visit/{id}")
    public ResponseEntity<?> updateVisit(@PathVariable Long id, @RequestBody VisitDto visitDto) {
        VisitDto updatedVisit = doctorService.updateVisit(id, visitDto);
        if (updatedVisit == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedVisit);
    }

    @GetMapping("/visits/search/{title}")
    public ResponseEntity<List<VisitDto>> searchVisit(@PathVariable String title) {
        return ResponseEntity.ok(doctorService.searchVisitByTitle(title));
    }

    @GetMapping("/visit/{id}")
    public ResponseEntity<VisitDto> getVisitById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getVisitById(id));
    }

    @PostMapping("/visit/information")
    public ResponseEntity<?> createInformation(@RequestParam Long visitId, @RequestParam Long postedBy, @RequestParam String content){
        try {
            return ResponseEntity.ok(doctorService.createInformation(visitId, postedBy, content));

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @DeleteMapping("/visit/information/delete/{id}")
    public ResponseEntity<Void> deleteInformation(@PathVariable Long id) {
        doctorService.deleteInformation(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/visit/informations/{visitId}")
    public ResponseEntity<List<InformationDto>> getInformationsByVisitId(@PathVariable Long visitId) {
        return ResponseEntity.ok(doctorService.getInformationsByVisitId(visitId));
    }

}
