package team830.SuperCanvasser.Variable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import java.util.List;
@RequestMapping("/var")
@RestController
public class VariableController {
    @Autowired
    private VariableService variableService;

    @RequestMapping(value = "/edit/", method = RequestMethod.POST)
    public Variable editVar(@RequestBody Variable var, BindingResult result) {
        System.out.println("####" + var);
        if (result.hasErrors()) {
            System.out.println("FUCK");
            return null;
        } else {
            return (variableService.editVariable(var));
        }
    }
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Variable> getAllVariables(){
        return(variableService.findAll());
    }

}

