package team830.SuperCanvasser.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody User user, HttpServletRequest request) throws IOException {
        log.info("UserController :: Process Login");

        User loggedInUser = userService.loginUser(user);
        if (loggedInUser != null) {
            request.getSession().setAttribute("user",loggedInUser);
            return ResponseEntity.ok(loggedInUser);
        }

        log.info("UserController :: Invalid Credentials :: " +
                "Email: " + user.getEmail() + " Pwd: " + user.getPwd());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @RequestMapping(value = "/login/role", method = RequestMethod.GET)
    public void selectRole(@RequestParam Role role, HttpServletRequest request) throws IOException {
        log.info("UserController :: Role has been selected.");
        request.getSession().setAttribute("role", role);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest request) throws IOException {
        request.getSession().removeAttribute("user");
        log.info("UserController :: User logged out");
    }

    // system admin user control functionalities

    @RequestMapping(value = "/sysad/edit", method = RequestMethod.POST)
    public ResponseEntity editUser(@RequestBody User user, HttpServletRequest request){
        if(userService.getUserBy_id(user.get_id())==null){
            log.info("UserController : User Does Not Exist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Such User");
        }
        else if(getRoleInSession(request).equals(Role.ADMIN)){
            log.info("UserController : User has been edited");
            return ResponseEntity.ok(userService.editUser(user));
        }
        log.info("UserController :: Does not have authority to edit the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/sysad/add", method = RequestMethod.POST)
    public ResponseEntity addUser(@RequestBody User user, HttpServletRequest request, BindingResult result){
        if(result.hasErrors()){
            log.info("UserController :: Does not have authority to add the users");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request");
        }
        if(getRoleInSession(request).equals(Role.ADMIN)){
            log.info("UserController :: User has been added");
            return ResponseEntity.ok(userService.addUser(user));
        }
        log.info("UserController :: Does not have authority to add the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");

    }

    @RequestMapping(value = "/sysad/view" , method = RequestMethod.GET)
    public ResponseEntity viewUser(@RequestParam String email, HttpServletRequest request) {
        if (getRoleInSession(request).equals(Role.ADMIN)) {
            log.info("UserController :: Got user information");
            return ResponseEntity.ok(userService.getUserByEmail(email));
        }
        log.info("UserController :: Does not have authority to view the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/sysad/delete", method = RequestMethod.GET)
    public ResponseEntity deleteUser(@RequestParam String _id, HttpServletRequest request){
        if(getRoleInSession(request).equals(Role.ADMIN)){
            log.info("UserController :: User has been deleted");
            userService.deleteUser(_id);
            return ResponseEntity.ok().body("User deleted");
        }
        log.info("UserController :: Does not have authority to add the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/sysad/viewAll" , method = RequestMethod.GET)
    public ResponseEntity viewAllUser(HttpServletRequest request) {
        if (getRoleInSession(request).equals(Role.ADMIN)) {
            return ResponseEntity.ok(userService.getAllUser());
        }
        log.info("UserController :: Does not have authority to view the users");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    // when they request to change the role from the dropdown
    // returns user
    @RequestMapping(value = "/changeRole", method = RequestMethod.GET)
    public ResponseEntity changeRole(@RequestParam Role role, HttpServletRequest request){
        User user = getUserInSession(request);
        if(user.getRole().contains(role)){
            request.getSession().setAttribute("role", role);
            return ResponseEntity.ok(user);
        }
        log.info("UserController :: Does not have selected role for this user");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    public static User getUserInSession(HttpServletRequest request){
        HttpSession session= request.getSession();
        return (User) session.getAttribute("user");
    }

    public static Role getRoleInSession(HttpServletRequest request){
        HttpSession session = request.getSession();
        return (Role)session.getAttribute("role");
    }

}
