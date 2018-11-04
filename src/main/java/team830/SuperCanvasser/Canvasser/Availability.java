package team830.SuperCanvasser.Canvasser;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Task.Task;

import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "availabilities")
@Data
public class Availability {
    @Id
    private String _id;
    @NotNull(message = "Must enter at least one date.")
    private List<String> availabilityDates;

    @Indexed(unique = true)
    private String canvasserId;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);


    public Availability(List<String> dates, String id) {
        availabilityDates = new ArrayList<String>(dates);
        this.canvasserId = id;
    }
}
