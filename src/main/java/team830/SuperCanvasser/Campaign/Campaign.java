package team830.SuperCanvasser.Campaign;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.data.annotation.Transient;
import team830.SuperCanvasser.Status;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Location.Location;


import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@Document(collection = "campaigns")
@Data
public class Campaign {
    @Id
    private String _id;
    @NotNull(message = "Must enter at least one manager.")
    private List<String> managers; // objectId of managers
    @NotNull(message = "A start and end date must be provided.")
    private String startDate;
    @NotNull
    private String endDate;
    private List<String> canvassers;
    @DBRef
    @NotNull(message = "At least one location must be set.")
    private List<Location> locations;
    @NotNull(message = "At least one question must be added.")
    private List<String> questions;
    private List<String> tasks;
    @Indexed(unique = true)
    private String name;
    private double avgDuration;
    private String talkingPoints;
    private Status status;

    @JsonIgnore
    @Transient
    private Timer statusTimer;

    public Campaign(List<String> managersList, String start, String end,
                    List<String> canvassersList, List<Location> locationsList,
                    List<String> questionsList, String campaignName, double avgVisitDuration, String notes) {

        this.managers = new ArrayList<String>(managersList);
        this.startDate = start;
        this.endDate = end;
        this.canvassers = new ArrayList<String>(canvassersList);
        this.locations = new ArrayList<Location>(locationsList);
        this.questions = new ArrayList<String>(questionsList);
        this.tasks = new ArrayList<String>();
        this.name = campaignName;
        this.avgDuration = avgVisitDuration;
        this.talkingPoints = notes;
        this.status = Status.INACTIVE;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public List<String> getManagers() {
        return managers;
    }

    public void setManagers(List<String> managers) {
        this.managers = managers;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public List<String> getCanvassers() {
        return canvassers;
    }

    public void setCanvassers(List<String> canvassers) {
        this.canvassers = canvassers;
    }

    public List<Location> getLocations() { return locations; }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public List<String> getQuestions() { return questions; }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAvgDuration() {
        return avgDuration;
    }

    public void setAvgDuration(double avgDuration) {
        this.avgDuration = avgDuration;
    }

    public String getTalkingPoints() {
        return talkingPoints;
    }

    public void setTalkingPoints(String talkingPoints) {
        this.talkingPoints = talkingPoints;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    // this automatically triggers the campaign to turn complete or active when the date is reached
    public void scheduleTimerForDate(){
        this.statusTimer = new Timer();
        StartTimerTask startTimerTask = new StartTimerTask(this);
        EndTimerTask endTimerTask = new EndTimerTask(this);

        Date startDate = Date.valueOf(this.startDate);
        Date endDate = Date.valueOf(this.endDate);

        this.statusTimer.schedule(startTimerTask, startDate);
        this.statusTimer.schedule(endTimerTask, endDate);
    }

    class StartTimerTask extends TimerTask{
        Campaign campaign;
        StartTimerTask(Campaign campaign){
            this.campaign = campaign;
        }
        @Override
        public void run() {
            campaign.setStatus(Status.ACTIVE);
        }
    }

    class EndTimerTask extends TimerTask{
        Campaign campaign;
        EndTimerTask(Campaign campaign){
            this.campaign = campaign;
        }
        @Override
        public void run() {
            campaign.setStatus(Status.COMPLETED);
        }
    }

}
