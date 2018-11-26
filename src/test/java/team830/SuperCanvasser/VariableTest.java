package team830.SuperCanvasser;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableRepo;
import team830.SuperCanvasser.Variable.VariableService;

import java.util.List;

@Rollback
@RunWith(SpringRunner.class)
@SpringBootTest
public class VariableTest {
    @Autowired
    private VariableRepo variableRepo;

    @Autowired
    VariableService variableService;

    @Test
    public void testAddVar() {
        Variable var0 = new Variable("avgSpeed", "5");
        Variable var1 = new Variable("dayDuration", "10");
        Variable res0 = variableRepo.save(var0);
        Variable res1 = variableRepo.save(var1);

        Assert.assertEquals(var0, res0);
        Assert.assertEquals(var1, res1);
    }

        @Test
        public void testEditVar() {
            variableRepo.deleteAll();
            Variable var0 = new Variable("avgSpeed", "5");
            Variable res0 = variableRepo.save(var0);
            Assert.assertEquals(var0, res0);

            res0.setValue("99");
            Variable res2 = variableService.editVariable(res0);
            Assert.assertEquals(res0, res2);


            Variable var1 = new Variable("dayDuration", "10");
            Variable res1 = variableRepo.save(var1);
            Assert.assertEquals(var1, res1);

            res1.setValue("83");
            Variable res3 = variableService.editVariable(res1);
            Assert.assertEquals(res1, res3);
        }

        @Test
        public  void testGetVars() {
            variableRepo.deleteAll();
            Variable var0 = new Variable("avgSpeed", "5");
            Variable var1 = new Variable("dayDuration", "10");
            Variable res0 = variableRepo.save(var0);
            Variable res1 = variableRepo.save(var1);

            Assert.assertEquals(var0, res0);
            Assert.assertEquals(var1, res1);

            List<Variable> res2 = variableService.findAll();
            Assert.assertEquals(res0, res2.get(0));
            Assert.assertEquals(res1, res2.get(1));
        }

}
