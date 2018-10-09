package team830.SuperCanvasser.User;

import team830.SuperCanvasser.Task.Task;

import java.util.ArrayList;
import java.util.Date;

public class Canvasser extends User {
    private ArrayList<Date> availabilityDates;
    private ArrayList<Task> tasks;

    @Override
    public boolean verifyLogin() {

        return false;
    }
}
