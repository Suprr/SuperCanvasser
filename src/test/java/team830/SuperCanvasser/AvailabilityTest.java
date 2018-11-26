package team830.SuperCanvasser;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.Campaign.CampaignService;
import team830.SuperCanvasser.Availability.Availability;
import team830.SuperCanvasser.Availability.AvailabilityRepo;
import team830.SuperCanvasser.Availability.AvailabilityService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Rollback
@RunWith(SpringRunner.class)
@SpringBootTest
public class AvailabilityTest {

        @Autowired
        AvailabilityRepo availabilityRepo;

        @Autowired
        AvailabilityService availabilityService;

        @Autowired
        CampaignService campaignService;

        Availability avail0 = new Availability(
                new ArrayList<String> (Arrays.asList("1996-05-15", "1996-05-25")), "CanvasserID");
    @Test
    public void testAvailableDates(){
//        public List<Date> listAvailableDates(String sdate, String edate, Availability availability) {

        List<Date> dates = campaignService.listAvailableDates("1996-05-04", "1996-06-01",avail0 );
        for (Date date : dates){
            System.out.println(date.toString());
        }
    }

    @Test
    public void testAddAvailability() {
        Availability availability = availabilityService.addAvailability(avail0);
        Assert.assertEquals(availability, avail0);
    }

    @Test
    public void testEditAvailability() {
        availabilityRepo.deleteAll();
        Availability availability = availabilityService.addAvailability(avail0);
        Assert.assertEquals(availability, avail0);
        availability.setCanvasserId("TestCanvasserId");

        Availability res0 = availabilityService.editAvailability(availability);

        Assert.assertEquals(res0.getCanvasserId(), availability.getCanvasserId());

        Availability res1 = availabilityService.editAvailability(new Availability(
                new ArrayList<String> (Arrays.asList("1996-05-15", "1996-05-25")), "CanvasserID"));

        Assert.assertNull(res1);
    }

    @Test
    public void testFindByCanvasser() {
        availabilityRepo.deleteAll();
        Availability res0 = availabilityService.addAvailability(new Availability(
                new ArrayList<String> (Arrays.asList("1996-05-15", "1996-05-25")), "CanvasserID0"));
        Availability res1 = availabilityService.addAvailability(new Availability(
                new ArrayList<String> (Arrays.asList("1996-05-15", "1996-05-25")), "CanvasserID1"));
        Availability res2 = availabilityService.addAvailability(new Availability(
                new ArrayList<String> (Arrays.asList("1996-05-15", "1996-05-25")), "CanvasserID2"));

        List<Availability> res3 = availabilityService.findByCanvasserIdEquals(new ArrayList<String>(
                Arrays.asList(res0.getCanvasserId(),res1.getCanvasserId(),res2.getCanvasserId())
        ));

        Assert.assertEquals(
                res3,
                (Arrays.asList(
                        res0,
                        res1,
                        res2
                )
                )
        );
    }


}

