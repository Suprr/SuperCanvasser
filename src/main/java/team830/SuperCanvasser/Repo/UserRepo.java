package team830.SuperCanvasser.Repo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import team830.SuperCanvasser.User.User;

public interface UserRepo extends MongoRepository<User, ObjectId> {
    User findByEmail(String email);

}