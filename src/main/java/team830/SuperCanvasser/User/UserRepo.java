package team830.SuperCanvasser.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findBy_id(String _id);
    List<User> findUserByFirstNameRegex(String regexFirstName);
    List<User> findUserByLastNameRegex(String regexLastName);

}
