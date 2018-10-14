package team830.SuperCanvasser.User;

import org.springframework.stereotype.Service;

@Service
public interface UserInterface {
    User editUser(User user);
    User addUser(User user);
    User getUserByEmail(String email);
}
