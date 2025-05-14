package pl.dmcs.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import pl.dmcs.dto.VisitDto;
import pl.dmcs.enums.VisitStatus;

import java.util.Date;

@Entity
@Data
@Table(name = "visits")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Date dueDate;

    private String priority;

    private VisitStatus visitStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public VisitDto getVisitDto(){
        VisitDto visitDto = new VisitDto();
        visitDto.setId(id);
        visitDto.setTitle(title);
        visitDto.setDescription(description);
        visitDto.setPatientName(user.getName());
        visitDto.setPatientId(user.getId());
        visitDto.setDueDate(dueDate);
        visitDto.setPriority(priority);
        visitDto.setVisitStatus(visitStatus);
        return visitDto;
    }

}
