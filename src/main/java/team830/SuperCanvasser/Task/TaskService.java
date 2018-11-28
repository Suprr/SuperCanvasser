package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationService;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.User.UserRepo;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TaskService {

    @Autowired
    private LocationService locationService;
    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private UserRepo userRepo;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    public Task editTask(Task task) {
        log.debug("Executing edit task - service");
        if (task.get_id() != null) {
            if (taskRepo.existsById(task.get_id())) {
                log.debug("Task Exists");
                return taskRepo.save(task);
            }
        } else {
            log.debug("Task doesn't exist");
        }
        return null;
    }

    public Task addTask(Task task) {
        log.info("TaskService :: Executing add task - service");
        return taskRepo.insert(task);
    }

    public Task findBy_Id(String id) {
        log.debug("Executing find task by id - service");
        return taskRepo.findBy_id(id);
    }

    public List<Task> findByCanvasserIdAndTaskStatus(String id, Status status) {
        log.debug("Executing find tasks by canvasser ID - service");
        return taskRepo.findByCanvasserIdAndTaskStatus(id, status);
    }

    public Task findTodayTask(String _id){
        List<Task> tasks = taskRepo.findAll();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("YYYY-MM-dd");
        for(Task t : tasks){
            System.out.println(t.getCanvasserId() + "  " + _id + "    " + t.getDate() + "  gsrg" + (formatter.format(date).toString())+"fkfeml");
            if(t.getCanvasserId().equals(_id) && t.getDate().equals(formatter.format(date).toString()))
                return t;
        }
        return null;
    }

    public List<Task> findAllTasksById(List<String> ts){
        List<Task> tasks = new ArrayList<>();
        for(String t : ts){
            tasks.add(taskRepo.findBy_id(t));
        }
        return tasks;
    }

    // get all locations for all tasks
    public List<Location> getAllLoctionsForAllTasks(List<Task> tasks){
        Set<Location> locationSet = new HashSet<>();
        for(int i = 0; i<tasks.size(); i++){
            List<Location> locations = locationService.findLocationsById(tasks.get(i).getLocations());
            locationSet.addAll(locations);
        }
        List<Location> locations = new ArrayList<>(locationSet);
        return locations;
    }
    // for view task.. returns the user id and gets the user
    public User getCanvasserById(String _id){
        log.info("TaskService :: getting canvasser by id");
        return userRepo.findBy_id(_id);
    }

}

