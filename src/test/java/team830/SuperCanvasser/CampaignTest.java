package team830.SuperCanvasser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.Campaign.CampaignRepo;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CampaignTest {
    @Autowired
    private CampaignRepo repository;

    @Test
    public void contextLoads() {
//        repository.deleteAll();
//        Manager manager = new Manager();
//        Campaign var1 = new Campaign(new ArrayList<Manager>(), new Date(), new Date(), new ArrayList<Canvasser>(),
//                new ArrayList<Location>(), new ArrayList<String>(), "tesstName", 5, "notes");
//        Campaign var2 = new Campaign(new ArrayList<Manager>(), new Date(), new Date(), new ArrayList<Canvasser>(),
//                new ArrayList<Location>(), new ArrayList<String>(), "testaName", 6, "notes");
//        repository.save(var1);
//        repository.save(var2);
//
////            System.out.println(repository.findAll());
//        System.out.println("Objects Inserted\n============");
//        System.out.println(var1);
//        System.out.println(var2);
//        System.out.println("Objects Retrieved from Database\n============");
//        System.out.println("aka Variables found with findAll():");
//        System.out.println("-------------------------------");
//        for (Campaign var : repository.findAll()) {
//            System.out.println(var);
//        }
//        System.out.println();

//        repository.deleteAll();
    }


}
