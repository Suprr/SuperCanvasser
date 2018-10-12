package team830.SuperCanvasser.Task;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "locations")
@Data
public class Location {

    private double latitude;
    private double longitude;
    private String numberStreet;
    private String unit;
    private String city;
    private String state;
    private String zip;
    private boolean visited;
    private Questionnaire questionnaire;

}
