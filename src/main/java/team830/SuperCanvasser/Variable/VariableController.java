package team830.SuperCanvasser.Variable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.util.List;
@RequestMapping("/sysad/var")
@RestController
public class VariableController {
    @Autowired
    private VariableService variableService;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);


    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Variable editVar(@RequestBody Variable var, BindingResult result) {
        if (result.hasErrors()) {
            log.info("Editing variable failed");
            return null;
        } else {
            log.info("Editing variable successful");
            return (variableService.editVariable(var));
        }
    }

    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public List<Variable> getAllVariables(){
        log.info("Getting all variables");
        return(variableService.findAll());
    }

}

