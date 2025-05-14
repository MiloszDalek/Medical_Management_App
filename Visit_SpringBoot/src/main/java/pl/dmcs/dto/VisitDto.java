package pl.dmcs.dto;

import lombok.Data;
import pl.dmcs.enums.VisitStatus;

import java.util.Date;

@Data
public class VisitDto {

    private Long id;

    private String title;

    private String description;

    private Date dueDate;

    private String priority;

    private Long patientId;

    private String patientName;

    private VisitStatus visitStatus;

}
