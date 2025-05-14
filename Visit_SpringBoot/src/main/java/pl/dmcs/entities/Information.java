package pl.dmcs.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pl.dmcs.dto.InformationDto;

import java.util.Date;

@Entity
@Data
@Table(name = "informations")
public class Information {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "visit_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Visit visit;

    public InformationDto getInformationDto() {
        InformationDto informationDto = new InformationDto();
        informationDto.setId(id);
        informationDto.setContent(content);
        informationDto.setCreationDate(creationDate);
        informationDto.setVisitId(visit.getId());
        informationDto.setUserId(user.getId());
        informationDto.setPostedBy(user.getName());
        informationDto.setUserRole(user.getUserRole());
        return informationDto;
    }

}
