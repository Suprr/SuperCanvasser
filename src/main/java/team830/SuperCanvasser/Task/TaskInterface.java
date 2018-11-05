package team830.SuperCanvasser.Task;

import org.springframework.stereotype.Service;
import team830.SuperCanvasser.User.User;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public interface TaskInterface {
    Task editTask(Task task);

    Task addTask(Task task);

    Task findBy_Id(String id);

    List<Task> findByCanvasserIdAndTaskStatus(String id, Status status);
}
