package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public User editUser(@ModelAttribute(value="users") User user){
        return(userService.editUser(user));
    }

    @ResponseBody
    @RequestMapping(value = "/view" , method = RequestMethod.GET)
    public User getUser(@RequestParam("email") String email) {
        return userService.getUser(email);
    }
}
