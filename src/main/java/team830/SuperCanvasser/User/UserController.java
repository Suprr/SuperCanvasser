package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/edit")
    public User editUser(@RequestParam(value="user") User user){
        return(userService.editUser(user));
    }

    @GetMapping("/view")
    public User getUser(@RequestParam(value="id") String id) {
        Optional<User> user1 = userService.getUser(id);
        if (user1.isPresent()) {
            User user = user1.get();
            System.out.println(user.email);
            return user;
        }
        else return null;
    }
}
