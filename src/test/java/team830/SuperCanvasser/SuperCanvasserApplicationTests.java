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
        repository.deleteAll();
        Variable var1 = new Variable("avgSpeed", "5");
        Variable var2 = new Variable("dayDuration", "10");
        repository.save(var1);
        repository.save(var2);

        System.out.println("Objects Retrieved from Database\n============");
        System.out.println(repository.findByType("avgSpeed"));
        System.out.println(repository.findByType("avgduration"));
        System.out.println("Objects Inserted\n============");
        System.out.println(var1);
        System.out.println(var2);

        System.out.println("Variables found with findAll():");
        System.out.println("-------------------------------");
        for (Variable var : repository.findAll()) {
            System.out.println(var);
        }
        System.out.println();
    }


}
