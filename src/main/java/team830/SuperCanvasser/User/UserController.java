package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private HttpSession session;
    User loggedInUser;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User user, HttpServletRequest request) throws IOException {
        log.info("UserController :: Process Login");
        session = request.getSession();
        loggedInUser = userService.loginUser(user);
        if (loggedInUser != null) {
            session.setAttribute("user",loggedInUser);
            return ResponseEntity.ok(loggedInUser);
        }

        log.info("UserController :: Invalid Credentials :: " +
                "Email: " + user.getEmail() + " Pwd: " + user.getPwd());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // system admin user control functionality
    @RequestMapping(value = "/sysad/edit", method = RequestMethod.POST)
    public ResponseEntity editUser(@RequestBody User user, HttpServletRequest request){
        loggedInUser = getUserInSession(request);
        if(loggedInUser.hasRole(Role.ADMIN)){
            log.info("UserController : User has been edited");
            return ResponseEntity.ok(userService.editUser(loggedInUser));
        }

        log.info("UserController :: Does not have authority to edit the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/sysad/add", method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody User user, HttpServletRequest request){
        loggedInUser = getUserInSession(request);
        if(loggedInUser.hasRole(Role.ADMIN)){
            log.info("UserController : User has been added");
            return ResponseEntity.ok(userService.addUser(user));
        }

        log.info("UserController :: Does not have authority to add the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");

    }

    @RequestMapping(value = "/sysad/view" , method = RequestMethod.GET)
    public ResponseEntity viewUser(@RequestParam("email") String email, HttpServletRequest request) {
        loggedInUser = getUserInSession(request);
        if (loggedInUser.hasRole(Role.ADMIN)) {
            log.info("UserController : Got user information");
            return ResponseEntity.ok(userService.getUserByEmail(email));
        }
        log.info("UserController :: Does not have authority to view the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    public User getUserInSession(HttpServletRequest request){
        session = request.getSession();
        return loggedInUser = (User) session.getAttribute("user");
    }

}
