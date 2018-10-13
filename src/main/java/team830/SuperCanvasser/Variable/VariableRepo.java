package team830.SuperCanvasser.Variable;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariableRepo extends MongoRepository<Variable, ObjectId> {
    Variable findByType(String type);
}
