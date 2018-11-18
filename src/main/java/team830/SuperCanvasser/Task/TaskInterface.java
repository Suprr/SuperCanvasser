package team830.SuperCanvasser.Task;

import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Status;

import java.util.List;

@Service
public interface TaskInterface {
    Task editTask(Task task);
    Task addTask(Task task);
    Task findBy_Id(String id);
    List<Task> findByCanvasserIdAndTaskStatus(String id, Status status);
    List<Location> findLocationsById(List<String> locs);
    List<Task> findAllTasksById(List<String> ts);
    Task findTodayTask(String _id);
}
