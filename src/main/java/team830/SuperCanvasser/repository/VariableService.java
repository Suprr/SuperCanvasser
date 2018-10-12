package team830.SuperCanvasser.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.User.Variable;

import java.util.List;

@Service
public class VariableService implements VariableInterface {
    @Autowired
    private VariableRepo variableRepo;

    @Override
    public Variable editVariable(Variable variable) {
        return variableRepo.save(variable);
    }

    @Override
    public List<Variable> getAllVariables() {
        return variableRepo.findAll();
    }

    public Variable findByName(String name) {
        return variableRepo.findByName(name);
    }
}
