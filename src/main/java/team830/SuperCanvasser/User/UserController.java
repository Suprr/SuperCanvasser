package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/edit/", method = RequestMethod.POST)
    public User editUser(@RequestBody User user, BindingResult result){
        if(result.hasErrors()){
            log.info("User Error: Failed to edit User");
            return null;
        }
        else{
            log.info("User : User has been edited");
            return(userService.editUser(user));
        }
    }

    @RequestMapping(value = "/add/", method = RequestMethod.POST)
    public User addUser(@RequestBody User user, BindingResult result){
        if(result.hasErrors()) {
            log.info("User Error: Failed to add User");
            return null;
        }
        else {
            log.info("User : User has been added");
            return (userService.addUser(user));
        }
    }

    @RequestMapping(value = "/view/" , method = RequestMethod.GET)
    public User viewUser(@RequestParam("email") String email) {
            log.info("User : Got user information");
            return userService.getUserByEmail(email);
        }

}
