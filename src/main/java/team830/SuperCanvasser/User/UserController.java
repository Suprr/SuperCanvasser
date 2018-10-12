package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team830.SuperCanvasser.Repo.UserRepo;

import javax.validation.Valid;


@RestController
@RequestMapping("/admin/*")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/admin/editUser")
    public String editUser(User user){
        return "YES";
    }
    @PostMapping("/admin/addUser")
    public String addUser(@Valid User user, BindingResult result){
//        User userExists = u.loadUserByUsername(user.getUsername());
        return " YES";
    }
}
