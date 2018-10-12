package team830.SuperCanvasser.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl{

    @Autowired
    private UserRepo userRepo;


}
