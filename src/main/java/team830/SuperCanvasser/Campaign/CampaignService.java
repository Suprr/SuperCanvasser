package team830.SuperCanvasser.Campaign;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Canvasser.Availability;
import team830.SuperCanvasser.Canvasser.AvailabilityRepo;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationRepo;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CampaignService implements CampaignInterface {

    @Autowired
    private CampaignRepo campaignRepo;

    @Autowired
    private LocationRepo locationRepo;

    private AvailabilityRepo availabilityRepo;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public Campaign editCampaign(Campaign campaign) {
        List<Location> locations = campaign.getLocations();
        for(Location location : campaign.getLocations()) {
            if(location.get_id()!=""){
                // creating a location if there is new location added in
                locations.add(createLocation(campaign.getQuestions(), location));
            }
        }
        for(Location loc : locationRepo.findAll()){
            if(!locations.contains(loc)){
                locationRepo.delete(loc);
            }
        }
        return campaignRepo.save(campaign);

    }

    @Override
    public Campaign addCampaign(Campaign campaign) {
    // Create Locations
        List<Location> locations = createLocations(campaign, new ArrayList<Location>());
        campaign.setLocations(locations);
        return campaignRepo.insert(campaign);
    }

    @Override
    public Campaign findBy_Id(String _id) {
        return campaignRepo.findBy_id(_id);
    }

    @Override
    public List<Campaign> findAll(){
        return campaignRepo.findAll();
    }


    @Override
    public List<Date> listAvailableDates(String sdate, String edate, Availability availability) {
        SimpleDateFormat formatter = new SimpleDateFormat("YYYY-MM-dd");
        List<String> sdates = new ArrayList<>(availability.getAvailabilityDates());
        List<Date> unavailDates = new ArrayList<>();
        List<Date> dates = new ArrayList<>();

        //convert string dates from availability to date objects
        for(String s: sdates){
            try {
                unavailDates.add(formatter.parse(s));
            } catch (ParseException e) {
                log.info("Formatting Strings failed");
            }
        }

        try {
            Date startDate = formatter.parse(sdate);
            Date endDate = formatter.parse(edate);

            if (startDate.after(endDate)) {
                log.info("start date must be before or equal to end date");
            }

            while (!startDate.after(endDate)) {
                boolean flag = false;
                for(Date d: unavailDates) {
                    if (startDate.equals(d)) {
                        flag = true;
                    }
                }
                    if (!flag) dates.add(startDate);
                        Calendar c = Calendar.getInstance();
                        //Setting the date to the given date
                        c.setTime(startDate);

                        //Number of Days to add
                        c.add(Calendar.DAY_OF_MONTH, 1);
                        startDate = c.getTime();
                        //Date after adding the days to the given date
    //                  String newDate = formatter.format(c.getTime());
            }
        } catch (ParseException e) {
            log.debug("Dates cannot be parsed");
        }
        return dates;
    }

    @Override
    public List<Campaign> findAllbyManager(String managerId){
        List<Campaign> campaigns = campaignRepo.findAll();
        List<Campaign> foundCampaigns = new ArrayList<>();

        for (Campaign c : campaigns) {
            if(c.getManagers().contains(managerId))
                foundCampaigns.add(c);
        }

        if(!foundCampaigns.isEmpty()){
            log.info("CampaignService :: returning campaigns from service");
            return foundCampaigns;
        }
        return null;
    }

    private Location createLocation(List<String> questions, Location location){
        HashMap<String, Boolean> qNa = new HashMap<>();
        // default answer for questionnaire is FALSE
        for(String s: questions){
            qNa.put(s, false);
        }
        location.set_id(ObjectId.get().toHexString());
        location.setqNa(qNa);
        return locationRepo.insert(location);
    }
    private List<Location> createLocations(Campaign campaign, List<Location> locations){
        for(Location location : campaign.getLocations()){
            locations.add(createLocation(campaign.getQuestions(), location));
        }
        return locations;
    }
}
