package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.Campaign.Campaign;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable("id") String id) {
        return (taskService.findBy_Id(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity getByCanvasserId(@PathVariable("id") String id) {
        log.info("TaskController : Grabbing Tasks by canvasser: " + id);
        return ResponseEntity.ok(taskService.findByCanvasserIdAndTaskStatus(id, Status.INACTIVE));
    }
}

