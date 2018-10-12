package team830.SuperCanvasser.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VariableController {
    @Autowired
    private VariableService variableService;

    @PostMapping("/var/edit")
    public Variable editVar(@RequestParam(value="name") String name, @RequestParam(value="value") String value){
        return(variableService.editVariable(variable));
    }

    @GetMapping("/var/")
    public Variable getVar(@RequestParam(value="name") String name){
        return(variableService.getVariable(variable));
    }
}

