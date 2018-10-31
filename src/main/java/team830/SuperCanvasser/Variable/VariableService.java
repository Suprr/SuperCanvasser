package team830.SuperCanvasser.Variable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.util.List;

@Service
public class VariableService implements VariableInterface {
    @Autowired
    private VariableRepo variableRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public Variable editVariable(Variable variable) {
        log.info("Edit Variable - Service");
        return variableRepo.save(variable);
    }

    @Override
    public List<Variable> findAll() {
        log.info("Find all Users - Service");
        return variableRepo.findAll();
    }

}
