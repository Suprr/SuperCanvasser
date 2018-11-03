package team830.SuperCanvasser.Campaign;

import team830.SuperCanvasser.Status;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Task.Location;
import team830.SuperCanvasser.Task.Questionnaire;


import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "campaigns")
@Data
public class Campaign {
    @Id
    private String _id;
    @DBRef
    @NotNull(message = "Must enter at least one manager.")
    private List<String> managers; // objectId of managers
    @NotNull(message = "A start and end date must be provided.")
    private Date startDate;
    @NotNull
    private Date endDate;
    @DBRef
    @NotNull(message = "At least one canvasser must work on this campaign.")
    private List<String> canvassers;
    @DBRef
    @NotNull(message = "At least one location must be set.")
    private List<Location> locations;
    @DBRef
    @NotNull(message = "At least one question must be added.")
    private List<String> questions;
    @DBRef
    private List<String> tasks;
    @DBRef
    private List<Questionnaire> questionnaires;
    @Indexed(unique = true)
    private String name;
    private double avgDuration;
    private int averageRating;
    private String talkingPoints;
    private Status status;


    public Campaign(List<String> managersList, Date start, Date end,
                    List<String> canvassersList, List<Location> locationsList,
                    List<String> questionsList, String campaignName, int avgVisitDuration, String notes) {

        this.managers = new ArrayList<String>(managersList);
        this.startDate = start;
        this.endDate = end;
        this.canvassers = new ArrayList<String>(canvassersList);
        this.locations = new ArrayList<Location>(locationsList);
        this.questions = new ArrayList<String>(questionsList);
        this.tasks = new ArrayList<String>();
        this.questionnaires = new ArrayList<Questionnaire>();
        this.name = campaignName;
        this.avgDuration = avgVisitDuration;
        this.talkingPoints = notes;
        this.status = Status.INACTIVE;
    }
}
