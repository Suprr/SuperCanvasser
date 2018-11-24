/*package team830.SuperCanvasser;

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
import team830.SuperCanvasser.User.*;

@Rollback
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {
    @Autowired
    UserRepo userRepo;

    @Autowired
    UserService userService;

    User user = new User("5bc229203e616621d0afc59c",
                        "a@gmail.com",
                        "aaa",
                        "Richy",
                        "Risdell",
                            new Role[]{});

    User user1 = new User("5bc0d1b4fc13ae64f7000001",
            "b@gmail.com",
            "bbb",
            "Joan",
            "Risdell",
            new Role[]{Role.ADMIN});
    @Test
    public void testRepoFindByEmail(){
        Assert.assertEquals(user, userRepo.findByEmail("a@gmail.com"));
    }

    @Test
    public void testServiceGetUser(){
        Assert.assertEquals(user, userService.getUserByEmail("a@gmail.com"));
    }

    @Test
    public void testServiceAddUser(){
        userRepo.deleteById("5bc0d1b4fc13ae64f7000001");
        userService.addUser(user1);
        Assert.assertEquals(user1, userRepo.findByEmail("b@gmail.com"));
    }

    @Test
    public void testServiceEditUser(){
        userRepo.findByEmail("5bc0d1b4fc13ae64f7000001");

        User user1 = new User("5bc0d1b4fc13ae64f7000001",
                "b@gmail.com",
                "bbb",
                "Joan",
                "Risdell",
                new Role[]{Role.ADMIN});
        userService.editUser(user1);
        Assert.assertEquals(user1, userRepo.findByEmail("b@gmail.com"));
    }

    //TODO : have to make some test

}
*/