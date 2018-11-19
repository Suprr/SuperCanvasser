package team830.SuperCanvasser;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.AssertionErrors;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.Task.TaskRepo;
import team830.SuperCanvasser.Task.TaskService;
import team830.SuperCanvasser.User.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Rollback
@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskTest {

        @Autowired
        TaskRepo taskRepo;

        @Autowired
        TaskService taskService;

        Task task0 = new Task(
                new ArrayList<String>(Arrays.asList("5bc229203e616621d0afc59c", "5bc229203e616621d0afc59d")),
                "5bc229203e616621d0afc59c"
        );

        Task task1 = new Task(
                new ArrayList<String>(Arrays.asList("5bc229203e616621d0afc59c", "5bc229203e616621d0afc595")),
                "5bc229203e616621d0afc595"
        );

        @Test
        public void testAddTask(){
            Task temp = taskService.addTask(task0);
            Assert.assertEquals(temp.getDate(), task0.getDate());
        }
//
        @Test
        public void testEditTask(){
            taskRepo.deleteAll();
            Task temp = taskService.addTask(task0);
            temp.setCanvasserId("CANVASSER1");
            temp.setTaskStatus(Status.ACTIVE);

            Task res = taskService.editTask(temp);

            Assert.assertEquals(temp, res);

            Task badTask = new Task(
                    new ArrayList<String>(Arrays.asList("FAKE", "FAKE")),
                    "FAKE");
            badTask.setCanvasserId("badTask");
            badTask.setTaskStatus(Status.ACTIVE);

            res = taskService.editTask(badTask);
            Assert.assertNull(res);
        }

        @Test
        public void testTaskById(){
            taskRepo.deleteAll();
            Task temp = taskService.addTask(task0);
            temp.setCanvasserId("CANVASSER1");
            temp.setTaskStatus(Status.ACTIVE);
            Task res = taskService.editTask(temp);

            Task res2 = taskService.findBy_Id(res.get_id());

            Assert.assertEquals(res, res2);
        }

        @Test
        public void testTaskByCanvasserIdAndStatus(){
            taskRepo.deleteAll();
            Task temp = taskService.addTask(task0);
            System.out.println(temp.toString());
            temp.setCanvasserId("CANVASSER1");
            temp.setTaskStatus(Status.ACTIVE);
            Task res0 = taskService.editTask(temp);

            temp = taskService.addTask(task1);
            System.out.println(temp.toString());
            temp.setCanvasserId("CANVASSER1");
            temp.setTaskStatus(Status.ACTIVE);
            Task res1 = taskService.editTask(temp);


            List<Task> res2 = taskService.findByCanvasserIdAndTaskStatus(res0.getCanvasserId(), res0.getTaskStatus());

            Assert.assertEquals(res0, res2.get(0));
            Assert.assertEquals(res1, res2.get(1));

        }

}
