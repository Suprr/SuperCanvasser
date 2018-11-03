package team830.SuperCanvasser.DataAccessLayer;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import team830.SuperCanvasser.User.User;

public interface UserRepo extends MongoRepository<User, ObjectId> {
    User findByUsername(String username);

}