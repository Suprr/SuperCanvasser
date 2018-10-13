package team830.SuperCanvasser.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String type);
    Optional<User> findById(String id);

}
