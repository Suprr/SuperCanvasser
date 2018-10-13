package team830.SuperCanvasser.Variable;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface VariableInterface {
    Variable editVariable(Variable variable);
    List<Variable> getAllVariables();
}
