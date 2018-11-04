package team830.SuperCanvasser.Task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableInterface;
import team830.SuperCanvasser.Variable.VariableRepo;

import java.util.List;

@Service
public class TaskService implements TaskInterface {
    @Autowired
    private TaskRepo taskRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public Task editTask(Task task) {
        log.debug("Executing edit task - service");
        return taskRepo.save(task);
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


}
