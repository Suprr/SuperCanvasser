package team830.SuperCanvasser;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.User.UserController;

//@RunWith(SpringRunner.class)
@DataMongoTest
public class UserFunctionalityTest {


    User testUser =new User("5bc229203e616621d0afc59c",
            "a@gmail.com",
            "aaa",
            "Richy",
            "Risdell",
            "12345",
            new Role[]{});

    UserController userController = new UserController();


    @Test
    public void testViewUser(){
            userController.addUser(testUser);
            Assert.assertEquals(testUser, userController.viewUser(testUser.getEmail()));
    }
//    @Test
//    public void testEditUser(){
//        testUser.setZipcode("00000");
//        Assert.assertEquals(testUser.getZipcode(), userController.editUser(testUser).getZipcode());
//    }
//    @Test(expected = NullPointerException.class)
//    public void testEmailExistFail(){
//        userController.addUser(testUser);
//    }


}
