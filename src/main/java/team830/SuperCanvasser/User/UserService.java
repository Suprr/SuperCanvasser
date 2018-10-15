package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;


@Service
public class UserService implements UserInterface{
    @Autowired
    private UserRepo userRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public User editUser(User user) {
        log.debug("Edit User - Service");
        return userRepo.save(user);
    }

    @Override
    public User addUser(User user) {
        log.debug("Add User - Service");
        return userRepo.insert(user);
    }

    @Override
    public User getUserByEmail(String email) {
        log.debug("Get User - Service");
        return userRepo.findByEmail(email);
    }
}
