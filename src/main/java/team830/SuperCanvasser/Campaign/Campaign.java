package team830.SuperCanvasser.Campaign;

import Configuration.Status;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Task.Location;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.User.Canvasser;
import team830.SuperCanvasser.User.Manager;


import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.concurrent.CopyOnWriteArrayList;

@Document(collection = "campaigns")
@Data
public class Campaign {
    @Id
    private ObjectId id;
    @DBRef
    @NotNull(message = "Must enter at least one manager.")
    private CopyOnWriteArrayList<Manager> managers;
    @DBRef
    @NotNull(message = "A start and end date must be provided.")
    private CopyOnWriteArrayList<Date> dates;
    @DBRef
    @NotNull(message = "At least one canvasser must work on this campaign.")
    private CopyOnWriteArrayList<Canvasser> canvassers;
    @DBRef
    @NotNull(message = "At least one location must be set.")
    private CopyOnWriteArrayList<Location> locations;
    @DBRef
    @NotNull(message = "At least one question must be added.")
    private CopyOnWriteArrayList<String> questions;
    private CopyOnWriteArrayList<Task> tasks;
    private String name;
    private double avgDuration;
    private int averageRating;
    private String notes;
    private Status status;


    public Campaign(CopyOnWriteArrayList<Manager> managersList, CopyOnWriteArrayList<Date> datesRange,
                    CopyOnWriteArrayList<Canvasser> canvassersList, CopyOnWriteArrayList<Location> locationsList,
                    CopyOnWriteArrayList<String> questionsList) {
        this.managers = managersList;
        this.dates = datesRange;
        this.canvassers = canvassersList;
        this.locations = locationsList;
        this.questions = questionsList;


    }
}
