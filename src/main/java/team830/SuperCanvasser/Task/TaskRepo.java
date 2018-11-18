package team830.SuperCanvasser.Task;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import team830.SuperCanvasser.Status;

import java.util.List;

@Repository
public interface TaskRepo extends MongoRepository<Task, String> {
    Task findBy_id(String id);
    List<Task> findByCanvasserIdAndTaskStatus(String id, Status status);

}
