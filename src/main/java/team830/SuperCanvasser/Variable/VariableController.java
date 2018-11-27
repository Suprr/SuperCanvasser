package team830.SuperCanvasser.Variable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/sysad/var")
@RestController
public class VariableController {

    @Autowired
    private VariableService variableService;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editVar(@RequestBody Variable var, HttpServletRequest request) {
        if (UserController.getRoleInSession(request).equals(Role.ADMIN)) {
            log.info("VarController :: Variable has been edited");
            return ResponseEntity.ok(variableService.editVariable(var));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ResponseEntity getAllVariables(HttpServletRequest request){
        if (UserController.getRoleInSession(request).equals(Role.ADMIN)) {
            log.info("VarController :: Getting all variables");
            return ResponseEntity.ok(variableService.findAll());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

}

