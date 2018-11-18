package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationRepo;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.validation.Valid;
import java.util.ArrayList;
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
            Task res = taskService.editTask(task);
                return ResponseEntity.ok(res);
            }
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Task addTask(@Valid @RequestBody Task task, BindingResult result) {
        if (result.hasErrors()) {
            log.info("TaskController : Task adding failed");
            return null;
        } else {
            log.info("TaskController : Task has been added");
            task.setTaskStatus(Status.INACTIVE);
            return (taskService.addTask(task));
        }

    }

    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public ResponseEntity getTaskById(@RequestParam String id) {
        return ResponseEntity.ok(taskService.findBy_Id(id));
    }

    @RequestMapping(value = "/getByCan", method = RequestMethod.GET)
    public ResponseEntity getByCanvasserId(@RequestParam("id") String id) {
        log.info("TaskController : Grabbing Tasks by canvasser: " + id);
        return ResponseEntity.ok(taskService.findByCanvasserIdAndTaskStatus(id, Status.INACTIVE));
    }

    @RequestMapping(value = "/locations", method = RequestMethod.POST)
    public ResponseEntity getLocationsById(@RequestBody List<String> locs){
        log.info("TaskController :: Grabbing locations by id");
        return ResponseEntity.ok(taskService.findLocationsById(locs));
    }
}

