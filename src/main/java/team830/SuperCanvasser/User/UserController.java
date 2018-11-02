package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User user, HttpServletRequest request) throws IOException {
        log.info("UserController :: Process Login");
        HttpSession session = request.getSession();
        User loggedInUser = userService.loginUser(user);
        if (loggedInUser != null) {
            session.setAttribute("user",loggedInUser);
            return ResponseEntity.ok(loggedInUser);
        }

        log.info("UserController :: Invalid Credentials :: " +
                "Email: " + user.getEmail() + " Pwd: " + user.getPwd());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // system admin user control functionality
    @RequestMapping(value = "/sysad/edit/", method = RequestMethod.POST)
    public ResponseEntity editUser(@RequestBody User user, HttpServletRequest request){
        User loggedInUser = new User();
        HttpSession session = request.getSession();
        if(Object.class.equals(User.class)){
            loggedInUser = (User) session.getAttribute("user");
        }
            log.info("User : User has been edited");
            return ResponseEntity.ok(userService.editUser(loggedInUser));

    }

    @RequestMapping(value = "/sysad/add/", method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody User user, BindingResult result){
        if(result.hasErrors()) {
            log.info("User Error: Failed to add User");
            return null;
        }
        else {
            log.info("User : User has been added");
            return ResponseEntity.ok(userService.addUser(user));
        }
    }

    @RequestMapping(value = "/sysad/view/" , method = RequestMethod.GET)
    public ResponseEntity viewUser(@RequestParam("email") String email) {
            log.info("User : Got user information");
            return ResponseEntity.ok(userService.getUserByEmail(email));
        }

}
