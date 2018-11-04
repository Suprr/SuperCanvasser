package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Location.LocationService;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;


@RequestMapping("/manager/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private CampaignService campaignService;
    @Autowired
    private UserService userService;
    @Autowired
    private LocationService locationService;

    //id = campaignId. this returns the list that has campaign and managers(User)
    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ResponseEntity getCampaign(@RequestParam String id, HttpServletRequest request) {
        Campaign campaign = campaignService.findBy_Id(id);
        log.info("CampaignController :: Getting Campaign");
        if(campaign != null){
            request.getSession().setAttribute("currentCampaign", campaign);
            log.info("CampaignController :: Campaign Found");
            return ResponseEntity.ok(campaign);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Campaign Not Found");
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editCampaign(@RequestBody Campaign campaign, HttpServletRequest request) {
            if(campaign.equals((request.getSession().getAttribute("currentCampaign")))){
                log.info("CampaignController :: Campaign Edited");
                return ResponseEntity.ok(campaignService.editCampaign(campaign));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to edit");
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createCampaign(@RequestBody Campaign campaign, HttpServletRequest request) {
            if(!campaignService.findAll().contains(campaign)){
                log.info("CampaignController :: Campaign has been created");
                campaign.getLocations();
                for(Location location : campaign.getLocations()){
                    HashMap<String, Boolean> qNa = new HashMap<>();
//                    qNa.put()

                    locationService.addLocation(location);
                }

                return ResponseEntity.ok(campaignService.addCampaign(campaign));
            }
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create campaign");
    }

    //campaign array(list) will be passed to the front as a responseEntity
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public ResponseEntity getAllCampaigns(@RequestBody String _id, HttpServletRequest request){
        log.info("CampaignController :: Campaign is returning all the list found by manager");
        return ResponseEntity.ok(campaignService.findAllbyManager(_id));
    }

}
