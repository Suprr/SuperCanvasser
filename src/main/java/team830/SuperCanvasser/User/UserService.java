package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserInterface{
    @Autowired
    private UserRepo userRepo;

    @Override
    public User editUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User addUser(User user) {
        return userRepo.insert(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);

    }
}
