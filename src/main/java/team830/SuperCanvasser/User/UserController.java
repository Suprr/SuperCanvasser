package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;

public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/admin/editUser")
    public String editUser(User user){
        return "YES";
    }
    @PostMapping("/admin/addUser")
    public String addUser(@Valid User user, BindingResult result){
        User userExists = userService.loadUserByUsername(user.getUsername());
        return " YES";
    }
}
