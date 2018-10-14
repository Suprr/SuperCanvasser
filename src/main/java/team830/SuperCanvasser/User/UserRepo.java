package team830.SuperCanvasser.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String type);
    Optional<User> findById(String id);

}
