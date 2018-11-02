package team830.SuperCanvasser.User;

import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Task.Task;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "users")
public class Canvasser extends User {
    private ArrayList<Date> availabilityDates;
    private ArrayList<Task> tasks;

}
