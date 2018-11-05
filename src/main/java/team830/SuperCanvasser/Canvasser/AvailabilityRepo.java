package team830.SuperCanvasser.Canvasser;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import team830.SuperCanvasser.Variable.Variable;

import java.util.List;

@Repository
public interface AvailabilityRepo extends MongoRepository<Availability, String> {
    @Query(value = "{ 'canvasserId': { $in: ?0 } }")
    List<Availability> findByCanvasserIdEquals(List<String> id);

    Availability findByCanvasserId(String id);
}
