package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationService;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RequestMapping("/task")
@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private LocationService locationService;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editTask(@RequestBody Task task, HttpServletRequest request) {
        if (UserController.getRoleInSession(request).equals(Role.CANVASSER)){
            log.info("TaskController : Task has been edited");
            return ResponseEntity.ok(taskService.editTask(task));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addTask(@Valid @RequestBody Task task, HttpServletRequest request, BindingResult result) {
        if (result.hasErrors()) {
            log.info("TaskController : Task adding failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Add Tasks");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)){
            log.info("TaskController : Task has been added");
            task.setTaskStatus(Status.INACTIVE);
            return ResponseEntity.ok(taskService.addTask(task));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public ResponseEntity getTaskById(@RequestParam String _id) {
        return ResponseEntity.ok(taskService.findBy_Id(_id));
    }

    @RequestMapping(value = "/getByCan", method = RequestMethod.GET)
    public ResponseEntity getByCanvasserId(@RequestParam String _id, HttpServletRequest request) {
        if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("TaskController : Grabbing Tasks by canvasser: " + _id);
            return ResponseEntity.ok(taskService.findByCanvasserIdAndTaskStatus(_id, Status.INACTIVE));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/locations", method = RequestMethod.POST)
    public ResponseEntity getLocationsById(@RequestBody List<String> locations){
        log.info("TaskController :: Grabbing locations by id");
        return ResponseEntity.ok(locationService.findLocationsById(locations));
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.POST)
    public ResponseEntity getTasksById(@RequestBody List<String> tasks, HttpServletRequest request) {
        if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("TaskController :: Grabbing tasks by id");
            return ResponseEntity.ok(taskService.findAllTasksById(tasks));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/activeTask", method = RequestMethod.GET)
    public ResponseEntity getTaskForToday(@RequestParam String _id, HttpServletRequest request){
        Task task = taskService.findTodayTask(_id);
        if(task == null){
            log.info("TaskController :: No ActiveTask Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No ActiveTask Found");
        } else if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("TaskController :: Grabbing task by canvasserId");
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    // ViewTask getting the user for the task
    @RequestMapping(value = "/canvasser", method = RequestMethod.GET)
    public ResponseEntity getAssignedCanvasser(@RequestParam String _id, HttpServletRequest request){
        if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("TaskController :: Grabbing canvsser by Id for view task");
            return ResponseEntity.ok(taskService.getCanvasserById(_id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    // @RequestBody Location object . RETURN = updated Location Object
    // this is after canvasser finished answer questionnaire
    @RequestMapping(value = "/updateLoc", method = RequestMethod.POST)
    public ResponseEntity getAssignedCanvasser(@RequestBody Location location, HttpServletRequest request, BindingResult result){
        if(result.hasErrors()){
            log.info("TaskController :: Location not found in DB");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Location Not Found");
        } else if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("TaskController :: Save Updated Location");
            return ResponseEntity.ok(locationService.updateLocation(location));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
}
