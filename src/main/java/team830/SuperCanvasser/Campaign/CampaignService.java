package team830.SuperCanvasser.Campaign;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Availability.Availability;
import team830.SuperCanvasser.Availability.AvailabilityService;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationRepo;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.Task.TaskService;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.User.UserService;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CampaignService{

    @Autowired
    private VariableService variableService;
    @Autowired
    private UserService userService;
    @Autowired
    private AvailabilityService availabilityService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private CampaignRepo campaignRepo;
    @Autowired
    private LocationRepo locationRepo;
//    @Autowired
//    private Algorithm algorithm;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    public Campaign editCampaign(Campaign originalCampaign, Campaign campaign) {
        List<Location> locations = campaign.getLocations();
        boolean locationEdited = false;
        // if new location added
        for(Location location : campaign.getLocations()) {
            if(location.get_id().equals("")){
                locationEdited = true;
                // if new location is added
                HashMap<String, Boolean> qNa = new HashMap<>();
                for(String s: campaign.getQuestions()){
                    qNa.put(s, false);
                }
                location.setqNa(qNa);
                location.set_id(ObjectId.get().toHexString());
                locationRepo.insert(location);
            }
        }

        // if location deleted
        for(Location loc : locationRepo.findAll()){
            if(!locations.contains(loc)){
                locationEdited = true;
                locationRepo.delete(loc);
            }
        }

        if(locationEdited){
            campaignRepo.delete(originalCampaign);
            campaign.scheduleTimerForDate();
            return campaignRepo.insert(campaign);
        }
        //stopping the timer for the original one and start a new timer for edited campaign
        return originalCampaign;
    }

    public Campaign addCampaign(Campaign campaign) {
        List<Variable> vars = variableService.findAll();
        double CANVASSER_SPEED = 0;
        int CANVASSER_WORKDAY = 0;
        for (Variable var : vars){
            if(var.getType().equals("CANVASSER_SPEED"))
            CANVASSER_SPEED = Double.parseDouble(var.getValue());
            else CANVASSER_WORKDAY = Integer.parseInt(var.getValue());
        }

        double TIME_PER_VISIT = campaign.getAvgDuration();

        Algorithm algo = new Algorithm(TIME_PER_VISIT, CANVASSER_SPEED, CANVASSER_WORKDAY);
        // Create Locations
        List<Location> locations = createLocations(campaign, new ArrayList<Location>());
        campaign.setLocations(locations);
        // triggering algo and setting the getting the tasks
        ArrayList<ArrayList<Location>> bestSol = algo.start(campaign);

        List<Task> tasks = new ArrayList();
        List<String> taskIDs = new ArrayList();

        for (int i = 0; i < bestSol.size(); i++) {
            List<String> loc = new ArrayList();
            for (int j = 0; j < bestSol.get(i).size(); j++) {
                loc.add(bestSol.get(i).get(j).get_id());
            }
            Task newTask = new Task(loc, loc.get(0));
            newTask.set_id(ObjectId.get().toHexString());
            taskIDs.add(newTask.get_id());
            tasks.add(newTask);
        }


        int totalCanvasserDates = 0;
        List<User> users = userService.getAllUser();
        List<User> canvassers = new ArrayList<>();
        for (User user : users) {
            if (user.hasRole(Role.CANVASSER)) {
                canvassers.add(user);
            }
        }
        for (int i = 0; i < canvassers.size(); i++) {
            System.out.println("Canvasser " +canvassers+", " +canvassers.size() +", "+ availabilityService.findByCanvasserId(canvassers.get(i).get_id()));
            totalCanvasserDates += listAvailableDates(campaign.getStartDate(), campaign.getEndDate(), availabilityService.findByCanvasserId(canvassers.get(i).get_id())).size();
        }

        if (totalCanvasserDates < tasks.size()) {
            //error
        }
        else {
            int canvasserIndex = 0;
            int taskIndex = 0;
            System.out.println("totalCanvasserDates"+ totalCanvasserDates);
            while (tasks.size() > taskIndex) {
                if (listAvailableDates(campaign.getStartDate(),campaign.getEndDate(),availabilityService.findByCanvasserId(canvassers.get(canvasserIndex).get_id())).size() > 0) {
                    totalCanvasserDates--;
                    tasks.get(taskIndex).setCanvasserId(canvassers.get(canvasserIndex).get_id());
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    String format = formatter.format(listAvailableDates(campaign.getStartDate(),campaign.getEndDate(),availabilityService.findByCanvasserId(canvassers.get(canvasserIndex).get_id())).get(0));
                    log.info("Availaibility sevice : "+availabilityService.findByCanvasserId(canvassers.get(canvasserIndex).get_id()).getAvailabilityDates());

                    Availability avail = availabilityService.findByCanvasserId(canvassers.get(canvasserIndex).get_id());
                    List <String> dates = avail.getAvailabilityDates();
                    dates.add(format);
                    avail.setAvailabilityDates(dates);
                    log.info("Availaibility sevice2 : "+availabilityService.findByCanvasserId(canvassers.get(canvasserIndex).get_id()).getAvailabilityDates());
                    availabilityService.editAvailability(avail);
                    tasks.get(taskIndex).setDate(format);
                    taskIndex++;
                }
                else {
                    canvasserIndex++;
                }
            }
        }
        System.out.println("Task Size :  "+tasks.size()+", "+tasks.get(0).get_id());

        for (Task t : tasks) {
            taskService.addTask(t);
        }

        campaign.scheduleTimerForDate();
        log.info("CampaignService :: Algorithm was triggered" +taskIDs);
        campaign.setTasks(taskIDs);
        log.info("campaign set tasks" + campaign.get_id()+","+ campaign.getEndDate()+","+  campaign.getStartDate()+","+ campaign.getAvgDuration()+","+  campaign.getStatus()+","+ campaign.getName()+","+ campaign.getTalkingPoints());

        return campaignRepo.insert(campaign);

    }

    public Campaign findBy_Id(String _id) {
        return campaignRepo.findBy_id(_id);
    }

    public List<Campaign> findAll(){
        return campaignRepo.findAll();
    }

    public List<Campaign> findAllbyManager(String managerId){
        List<Campaign> campaigns = campaignRepo.findAll();
        List<Campaign> foundCampaigns = new ArrayList<>();

        for (Campaign c : campaigns) {
            if(c.getManagers().contains(managerId))
                foundCampaigns.add(c);
        }

        if(!foundCampaigns.isEmpty()){
            log.info("CampaignService :: returning campaigns from service");
            return foundCampaigns;
        }
        return null;
    }

    private Location createLocation(List<String> questions, Location location){
        HashMap<String, Boolean> qNa = new HashMap<>();
        // default answer for questionnaire is FALSE
        for(String s: questions){
            qNa.put(s, false);
        }
        location.set_id(ObjectId.get().toHexString());
        location.setqNa(qNa);
        return locationRepo.insert(location);
    }

    private List<Location> createLocations(Campaign campaign, List<Location> locations){
        for(Location location : campaign.getLocations()){
            locations.add(createLocation(campaign.getQuestions(), location));
        }
        return locations;
    }

    public List<Date> listAvailableDates(String sdate, String edate, Availability availability) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        List<String> sdates = new ArrayList<>(availability.getAvailabilityDates());
        List<Date> unavailDates = new ArrayList<>();
        List<Date> dates = new ArrayList<>();

        //convert string dates from availability to date objects
        for(String s: sdates){
            try {
                unavailDates.add(formatter.parse(s));
            } catch (ParseException e) {
                log.info("Formatting Strings failed");
            }
        }

        try {
            Date startDate = formatter.parse(sdate);
            Date endDate = formatter.parse(edate);
//            log.info(sdate + " " + edate);
            log.info("START DATE " + startDate.toString() + "\nEND DATE " + endDate.toString());
            if (startDate.after(endDate)) {
                log.info("start date must be before or equal to end date");
                return null;
            }

            while (!startDate.after(endDate)) {
                boolean flag = false;
                for(Date d: unavailDates) {
                    if (startDate.equals(d)) {
                        flag = true;
                    }
                }
                if (!flag) dates.add(startDate);
                Calendar c = Calendar.getInstance();
                //Setting the date to the given date
                c.setTime(startDate);

                //Number of Days to add
                c.add(Calendar.DAY_OF_MONTH, 1);
                startDate = c.getTime();
                //Date after adding the days to the given date
                //                  String newDate = formatter.format(c.getTime());
            }
        } catch (ParseException e) {
            log.debug("Dates cannot be parsed");
        }
        return dates;
    }
}