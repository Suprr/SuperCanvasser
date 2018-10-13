package team830.SuperCanvasser.Variable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Variable> findAll() {
        return variableRepo.findAll();
    }

}
