package team830.SuperCanvasser.Canvasser;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import team830.SuperCanvasser.Variable.Variable;

import java.util.List;

@Repository
public interface AvailabilityRepo extends MongoRepository<Availability, String> {
    List<Availability> findByCanvasserId(String id);
}
