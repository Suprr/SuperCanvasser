package team830.SuperCanvasser.Variable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
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

}

