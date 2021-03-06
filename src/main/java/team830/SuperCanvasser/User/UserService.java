package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Availability.Availability;
import team830.SuperCanvasser.Availability.AvailabilityRepo;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Component
@Service
public class UserService{

    @Autowired
    private UserRepo userRepo;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    public User editUser(User user) {
        log.info("UserService :: Edit User");
        return userRepo.save(user);
    }

    public User addUser(User user) {
        log.info("UserService :: Add User");
        return userRepo.insert(user);
    }

    public void deleteUser(String userId){
        log.info("UserService :: Delete User");
        userRepo.deleteById(userId);
    }

    public User getUserByEmail(String email) {
        log.info("UserService :: Get User");
        return userRepo.findByEmail(email);
    }

    public User getUserBy_id(String _id) {
        log.info("UserService :: Get User by ID");
        return userRepo.findBy_id(_id);
    }

    public List<User> getAllUser() {
        log.info("UserService :: Get All the Users");
        return userRepo.findAll();
    }

    public List<User> getAllUsersByNameRegex(String nameRegex){
        log.info("UserService :: Get All the Users By Name");
        //removing duplicates by using set
        Set<User> userSet = new HashSet<>(userRepo.findUserByFirstNameRegex(nameRegex));
        userSet.addAll(userRepo.findUserByLastNameRegex(nameRegex));
        if(!userSet.isEmpty()){
            for(User user : userSet){
                if(!user.hasRole(Role.MANAGER)){
                    userSet.remove(user);
                }
            }
            List<User> users = new ArrayList<>(userSet);
            return users;
        }
        return null;
    }

    public User loginUser(User user) throws UnsupportedEncodingException {
        User repoUser = userRepo.findByEmail(user.getEmail());
        if (repoUser != null) {
            if(User.validatePwd(user.getPwd(), repoUser.getPwd())) {
                log.info("UserService :: repoUser Info :: email: " + repoUser.getEmail() + " pwd: " + repoUser.getPwd());
                log.info("UserController :: Successfully Logged In");
                return repoUser;
            }
        }
        return null;
    }

}
