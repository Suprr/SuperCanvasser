package team830.SuperCanvasser.Result;

 import org.bson.types.ObjectId;
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.RequestBody;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RequestMethod;
 import org.springframework.web.bind.annotation.RequestParam;

 import org.springframework.web.bind.annotation.RestController;
 import team830.SuperCanvasser.Campaign.Campaign;
import team830.SuperCanvasser.Campaign.CampaignService;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationService;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.Task.TaskService;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;


import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/manager/result")
@RestController
public class ResultController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private ResultService resultService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private CampaignService campaignService;
    @Autowired
    private LocationService locationService;

    // TableView Result @RequestParam = campaign id RETURN = list of tasks
    @RequestMapping(value = "/tableView", method = RequestMethod.POST)
    public ResponseEntity tableViewResult(@RequestBody Campaign campaign, HttpServletRequest request){
        // Find all the task by ID
        List<Task> tasks = taskService.findAllTasksById(campaign.getTasks());
        if(tasks == null){
            log.info("ResultController :: Failed to gather tasks for tableView");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)){
            log.info("ResultController :: tableView Result");
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
    // this is for qNa. RETURN = list of locations for requested task
    @RequestMapping(value = "/tableView/locList", method = RequestMethod.GET)
    public ResponseEntity locationListResult(@RequestParam String taskId, HttpServletRequest request){
        List<Location> locations = locationService.findLocationsById(taskService.findBy_Id(taskId).getLocations());
        if(locations == null){
            log.info("ResultController :: Failed to gather locations for Result");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("ResultController :: locationResult for tableView");
            return ResponseEntity.ok(locations);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");

    }
    // TODO have to calculate the questionnaire
    @RequestMapping(value = "/statView", method = RequestMethod.POST)

    public ResponseEntity statViewResult(@RequestBody Campaign campaign, HttpServletRequest request){
        List<Task> tasks = taskService.findAllTasksById(campaign.getTasks());
        // create and save result
        Result result = new Result(ObjectId.get().toHexString(), campaign, locationService.getAllRatings(tasks));
        if(result == null){
            log.info("ResultController :: Failed to gather Result");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("ResultController :: Result for StatView");
            return ResponseEntity.ok(resultService.createResult(result));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
    // Mapview param = campaignID RETURN = list of all locations from all the tasks
    @RequestMapping(value = "/mapView", method = RequestMethod.GET)
    public ResponseEntity mapViewResult(@RequestParam String _id, HttpServletRequest request){
        Campaign campaign = campaignService.findBy_Id(_id);
        List<Task> tasks = taskService.findAllTasksById(campaign.getTasks());
        List<Location> locations = taskService.getAllLoctionsForAllTasks(tasks);
        if(locations == null){
            log.info("ResultController :: Failed to gather Result");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("ResultController :: All Locations for MapView");
            return ResponseEntity.ok(locations);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
}
