package pl.dmcs.dto;

import lombok.Data;
import pl.dmcs.enums.UserRole;

import java.util.Date;

@Data
public class InformationDto {

    private Long id;

    private String content;

    private Date creationDate;

    private Long visitId;

    private Long userId;

    private String postedBy;

    private UserRole userRole;

}
