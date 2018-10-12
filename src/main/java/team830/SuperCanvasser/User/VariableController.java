package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.repository.VariableService;

import java.util.List;

@RestController
public class VariableController {
    @Autowired
    private VariableService variableService;

    @PostMapping("/var/edit")
    public Variable editVar(@RequestParam(value="var") Variable var){
        return(variableService.editVariable(var));
    }

    @GetMapping("/var/")
    public List<Variable> getAllVariables(){
        return(variableService.getAllVariables());
    }

    @PostMapping("/var/")
    public Variable findByName(@RequestParam(value="name") String name){
        return(variableService.findByName(name));
    }
}

