package team830.SuperCanvasser.User;

import java.util.Optional;

public interface UserInterface {
    User editUser(User user);
    User addUser(User user);
    Optional<User> getUser(String id);
}
