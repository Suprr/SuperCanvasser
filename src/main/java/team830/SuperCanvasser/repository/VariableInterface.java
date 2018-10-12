package team830.SuperCanvasser.repository;

import team830.SuperCanvasser.User.Variable;

public interface VariableInterface {
    Variable getVariable(String name);
    Variable editVariable(String name, String value);
}
