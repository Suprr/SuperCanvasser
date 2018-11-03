package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import team830.SuperCanvasser.CurrentObject;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private UserService userService;
    private User loggedInUser;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User user, HttpServletRequest request) throws IOException {
        log.info("UserController :: Process Login");
        loggedInUser = userService.loginUser(user);
        if (loggedInUser != null) {
            CurrentObject.setCurrentUser(loggedInUser);
            request.getSession().setAttribute("email", loggedInUser.getEmail());
            return ResponseEntity.ok(loggedInUser);
        }

        log.info("UserController :: Invalid Credentials :: " +
                "Email: " + user.getEmail() + " Pwd: " + user.getPwd());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @RequestMapping(value = "/login/role", method = RequestMethod.GET)
    public void selectRole(@RequestParam Role role){
        log.info("UserController :: Role has been selected.");
        CurrentObject.setCurrentRole(role);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout() {
        CurrentObject.setCurrentUser(null);
        log.info("UserController :: User logged out");
    }

    // system admin user control functionalities

    @RequestMapping(value = "/sysad/edit", method = RequestMethod.POST)
    public ResponseEntity editUser(@RequestBody User user){
        if(CurrentObject.getCurrentRole().equals(Role.ADMIN)){
            log.info("UserController : User has been edited");
            return ResponseEntity.ok(userService.editUser(user));
        }
        log.info("UserController :: Does not have authority to edit the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/sysad/add", method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody User user){
        if(CurrentObject.getCurrentRole().equals(Role.ADMIN)){
            log.info("UserController : User has been added");
            return ResponseEntity.ok(userService.addUser(user));
        }

        log.info("UserController :: Does not have authority to add the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");

    }

    @RequestMapping(value = "/sysad/view" , method = RequestMethod.GET)
    public ResponseEntity viewUser(@RequestParam("email") String email) {
        if (CurrentObject.getCurrentRole().equals(Role.ADMIN)) {
            log.info("UserController : Got user information");
            return ResponseEntity.ok(userService.getUserByEmail(email));
        }
        log.info("UserController :: Does not have authority to view the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

}
