package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Optional;

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/user/edit")
    public User editUser(@RequestParam(value="user") User user){
        return(userService.editUser(user));
    }

    @GetMapping("/user/view")
    public User getUser(@RequestParam(value="user") User user) {
        Optional<User> user1 = userService.getUser(user.id);
        if (user1.isPresent())
            return user1.get();
        else return null;
    }
}
