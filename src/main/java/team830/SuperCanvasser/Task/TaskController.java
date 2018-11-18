package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/task")

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editTask(@RequestBody Task task, BindingResult result) {
        if (result.hasErrors()) {
            log.info("TaskController : Task editing failed");
            return null;
        } else {
            log.info("TaskController : Task has been edited");
            return ResponseEntity.ok(taskService.editTask(task));
        }
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Task addTask(@Valid @RequestBody Task task, BindingResult result) {
        if (result.hasErrors()) {
            log.info("TaskController : Task adding failed");
            return null;
        } else {
            log.info("TaskController : Tagit statusk has been added");
            task.setTaskStatus(Status.INACTIVE);
            return (taskService.addTask(task));
        }
    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public ResponseEntity getTaskById(@RequestParam String _id) {
        return ResponseEntity.ok(taskService.findBy_Id(_id));
    }

    @RequestMapping(value = "/getByCan", method = RequestMethod.GET)
    public ResponseEntity getByCanvasserId(@RequestParam String _id) {
        log.info("TaskController : Grabbing Tasks by canvasser: " + _id);
        return ResponseEntity.ok(taskService.findByCanvasserIdAndTaskStatus(_id, Status.INACTIVE));
    }

    @RequestMapping(value = "/locations", method = RequestMethod.POST)
    public ResponseEntity getLocationsById(@RequestBody List<String> locations){
        log.info("TaskController :: Grabbing locations by id");
        return ResponseEntity.ok(taskService.findLocationsById(locations));
    }

    @RequestMapping(value = "/tasks", method = RequestMethod.POST)
    public ResponseEntity getTasksById(@RequestBody List<String> tasks){
        log.info("TaskController :: Grabbing tasks by id");
        return ResponseEntity.ok(taskService.findAllTasksById(tasks));
    }

    @RequestMapping(value = "/activeTask", method = RequestMethod.GET)
    public ResponseEntity getTaskForToday(@RequestParam String _id){
        Task task = taskService.findTodayTask(_id);
        if(task != null){
            log.info("TaskController :: Grabbing task by canvasserId");
            return ResponseEntity.ok(task);
        }
        log.info("TaskController :: No ActiveTask Found");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No ActiveTask Found");
    }

    // ViewTask getting the user for the task
    @RequestMapping(value = "/canvasser", method = RequestMethod.GET)
    public ResponseEntity getAssignedCanvasser(@RequestParam String _id, BindingResult result){
        if(result.hasErrors()){
            log.info("TaskController :: User Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Found");
        }
        log.info("TaskController :: Grabbing canvsser by Id for view task");
        return ResponseEntity.ok(taskService.getCanvasserById(_id));
    }

}

