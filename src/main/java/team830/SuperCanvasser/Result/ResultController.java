package team830.SuperCanvasser.Result;

 import org.bson.types.ObjectId;
 import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpRequest;
 import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
 import team830.SuperCanvasser.Campaign.Campaign;
 import team830.SuperCanvasser.Campaign.CampaignService;
 import team830.SuperCanvasser.Location.Location;
 import team830.SuperCanvasser.SuperCanvasserApplication;
 import team830.SuperCanvasser.Task.Task;
 import team830.SuperCanvasser.Task.TaskService;

 import javax.servlet.http.HttpServletRequest;
 import java.util.List;
 import java.util.Locale;

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

    // TableView Result @RequestParam = campaign id RETURN = list of tasks
    @RequestMapping(value = "/tableView", method = RequestMethod.POST)
    public ResponseEntity tableViewResult(@RequestBody Campaign campaign, BindingResult result){
        if(result.hasErrors()){
            log.info("ResultController :: Failed to find tasks");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        }
        // Find all the task by ID
        return ResponseEntity.ok(taskService.findAllTasksById(campaign.getTasks()));
    }
    // this is for qNa. RETURN = list of locations for requested task
    @RequestMapping(value = "/tableView/locList", method = RequestMethod.GET)
    public ResponseEntity locationListResult(@RequestParam String taskId){
        return ResponseEntity.ok(taskService.findLocationsById(taskService.findBy_Id(taskId).getLocations()));
    }

    @RequestMapping(value = "/statView", method = RequestMethod.POST)
    public ResponseEntity statViewResult(@RequestBody Campaign campaign, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            log.info("ResultController :: Failed to gather Result");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        }
        List<Task> tasks = taskService.findAllTasksById(campaign.getTasks());
        // create and save result
        Result result = new Result(ObjectId.get().toHexString(), campaign, taskService.getAllRatings(tasks));
        log.info("ResultController :: Result for StatView");
        return ResponseEntity.ok(resultService.createResult(result));
    }
    // Mapview param = campaignID RETURN = list of all locations from all the tasks
    @RequestMapping(value = "/mapView", method = RequestMethod.GET)
    public ResponseEntity mapViewResult(@RequestParam String _id){
        Campaign campaign = campaignService.findBy_Id(_id);
        List<Task> tasks = taskService.findAllTasksById(campaign.getTasks());
        List<Location> locations = taskService.getAllLoctionsForAllTasks(tasks);
        if(locations == null){
            log.info("ResultController :: Failed to gather Result");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request Failed");
        }
        log.info("ResultController :: All Locations for MapView");
        return ResponseEntity.ok(locations);
    }

}
