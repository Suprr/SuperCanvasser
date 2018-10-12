package team830.SuperCanvasser.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import team830.SuperCanvasser.User.Variable;

@Repository
public interface VariableRepo extends MongoRepository<Variable, ObjectId> {
    Variable findByName(String name);
}
