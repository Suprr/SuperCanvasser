package team830.SuperCanvasser.repository;

import team830.SuperCanvasser.User.Variable;

import java.util.List;

public interface VariableInterface {
    Variable findByName(String name);
    Variable editVariable(Variable variable);
    List<Variable> getAllVariables();
}
