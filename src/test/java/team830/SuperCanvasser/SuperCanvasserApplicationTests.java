package team830.SuperCanvasser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableRepo;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SuperCanvasserApplicationTests {
    @Autowired
    private VariableRepo repository;

    @Test
    public void contextLoads() {
        Variable variable = new Variable("avgduration", "55.5");
        repository.save(variable);

        System.out.println(repository.findByType("avgduration"));
        System.out.println("Variables found with findAll():");
        System.out.println("-------------------------------");
        for (Variable var : repository.findAll()) {
            System.out.println(var);
        }
        System.out.println();
    }


}
