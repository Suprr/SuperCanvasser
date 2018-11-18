package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationRepo;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService implements TaskInterface {

    @Autowired
    private LocationRepo locationRepo;
    @Autowired
    private TaskRepo taskRepo;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
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

    @Override
    public Task addTask(Task task) {
        log.debug("Executing add task - service");
        return taskRepo.insert(task);
    }

    @Override
    public Task findBy_Id(String id) {
        log.debug("Executing find task by id - service");
        return taskRepo.findBy_id(id);
    }

    @Override
    public List<Task> findByCanvasserIdAndTaskStatus(String id, Status status) {
        log.debug("Executing find tasks by canvasser ID - service");
        return taskRepo.findByCanvasserIdAndTaskStatus(id, status);
    }

    @Override
    public List<Location> findLocationsById(List<String> locs){
        List<Location> locations = new ArrayList<>();
        for(String loc : locs){
            locations.add(locationRepo.findLocationBy_id(loc));
        }
        return locations;
    }
}
