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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

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
        List<Location> locations = new ArrayList<>();
        for(Location location : campaign.getLocations()) {
            if(location.get_id()!=""){

            }
            else if(locationRepo.findLocationBy_id(location.get_id())!= null){

            }
        }
        return campaignRepo.save(campaign);

    }

    @Override
    public Campaign addCampaign(Campaign campaign) {
    // Create Locations
        List<Location> locations = new ArrayList<>();
        for(Location location : campaign.getLocations()){
            log.info("Campaign Service :: putting the loction" + location.isVisited());
            HashMap<String, Boolean> qNa = new HashMap<>();
            // default answer for questionnaire is FALSE
            for(String s: campaign.getQuestions()){
                qNa.put(s, false);
            }
            location.set_id(ObjectId.get().toHexString());
            location.setqNa(qNa);
            locations.add(locationRepo.insert(location));
        }
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
        List<Date> availDates = new ArrayList<>();
        try {
            Date startDate = formatter.parse(sdate);
            Date endDate = formatter.parse(edate);
//            Availability availabilities = availabilityRepo.findByCanvasserId(availability.getCanvasserId());
//            List<String> dates = new ArrayList<String>(availabilities.getAvailabilityDates());
            List<String> dates = new ArrayList<String>(availability.getAvailabilityDates());

            for(String s : dates){
                availDates.add(formatter.parse(s));
            }
        } catch (ParseException e) {
            log.debug("Dates cannot be parsed");
        }

        return availDates;
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
}
