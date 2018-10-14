package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public User editUser(@RequestBody User user){
        return(userService.editUser(user));
    }

    @RequestMapping(value = "/view" , method = RequestMethod.GET)
    public User getUserByEmail(@RequestParam("email") String email) {
        User user = userService.getUserByEmail(email);
        if(user == null)
            System.out.println("nullllllll");
        return user;
    }
}
