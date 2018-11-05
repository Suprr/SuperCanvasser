package team830.SuperCanvasser.Task;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "tasks")
@Data
public class Task {
    @Id
    private String _id;
    private List<String> locations;
    private Date date;
    private Status taskStatus;
    private String recommendedLoc;
    private String canvasserId;

    public Task(List<String> locations, String rec) {
        this.locations = new ArrayList<String>(locations);
        this.recommendedLoc = rec;
        this.taskStatus = Status.INACTIVE;
        this.date = new Date();
    }

}
