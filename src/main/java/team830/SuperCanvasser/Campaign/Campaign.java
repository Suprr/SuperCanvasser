package team830.SuperCanvasser.Campaign;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.User.Canvasser;
import team830.SuperCanvasser.User.Manager;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "campaigns")
@Data
public class Campaign {
    private ArrayList<Manager> managers;
    private ArrayList<Date> dates;
    private ArrayList<String> questions;
    private double avgDuration;
    private ArrayList<Canvasser> canvassers;
    private int averageRating;
    private String notes;
    private ArrayList<Task> tasks;
}
