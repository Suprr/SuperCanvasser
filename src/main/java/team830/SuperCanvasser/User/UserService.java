package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;


@Component
@Service
public class UserService implements UserDetailsService, UserInterface{

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }else{
            UserDetails details = new CustomizedUserDetails(user);
            return details;
        }
    }
}
