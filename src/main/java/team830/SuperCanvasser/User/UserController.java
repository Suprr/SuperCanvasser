package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public User editUser(@RequestBody User user){
        return(userService.editUser(user));
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public User addUser(@RequestBody User user){
        return(userService.addUser(user));
    }

    @RequestMapping(value = "/view" , method = RequestMethod.GET)
    public User viewUser(@RequestParam("email") String email) {
        User user = userService.getUserByEmail(email);
        return user;
    }
}
