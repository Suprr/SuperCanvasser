package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.User.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/manager/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private CampaignService campaignService;
    @Autowired
    private UserService userService;

    //id = campaignId. this returns the list that has campaign and managers(User)
    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ResponseEntity viewCampaign(@RequestParam String _id, HttpServletRequest request) {
        Campaign campaign = campaignService.findBy_Id(_id);
        log.info("CampaignController :: Getting Campaign");
        if(campaign != null){
            request.getSession().setAttribute("currentCampaign", campaign);
            log.info("CampaignController :: Campaign Found");
            List<Object> returnList = new ArrayList<>();
            returnList.add(campaign);
            // getting the users for managers to display information
            for(String s: campaign.getManagers()){
                returnList.add(userService.getUserBy_id(s));
            }
            return ResponseEntity.ok(returnList);
        }
        log.info("CampaignController :: Campaign Not Found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Campaign Not Found");
    }

    @RequestMapping(value = "/view/man", method = RequestMethod.POST)
    public ResponseEntity getManagerForView(@RequestBody List<String> manId){
        List<User> manList = new ArrayList<>();
        if(!manId.isEmpty()){
            for(String id : manId){
                manList.add(userService.getUserBy_id(id));
            }
            log.info("CampaignController :: Getting the Managers (User) for Campaign");
            return ResponseEntity.ok(manList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager Not Found for Campaign");
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editCampaign(@Valid @RequestBody Campaign campaign) {
        // checking whether campaign exist in DB
        if(campaignService.findBy_Id(campaign.get_id()) == null || campaign.getStatus().equals(Status.INACTIVE)){
            log.info("CampaignController :: Campaign is Active or finished.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to edit");
        }
        else{
            log.info("CampaignController :: Campaign has been edited");
            return ResponseEntity.ok(campaignService.editCampaign(campaign));
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createCampaign(@RequestBody Campaign campaign, BindingResult result) {
            if(!result.hasErrors()){
                log.info("CampaignController :: Campaign has been created");
                return ResponseEntity.ok(campaignService.addCampaign(campaign));
            }
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create campaign");
    }

    //campaign array(list) will be passed to the front as a responseEntity
    // _id = managerID
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity getAllCampaigns(@RequestParam String _id, HttpServletRequest request){
        List<Campaign> campaigns = campaignService.findAllbyManager(_id);
        if(campaigns != null){
            log.info("CampaignController :: Campaign is returning all the list found by manager");
            return ResponseEntity.ok(campaigns);
        }
        log.info("CampaignController :: No Campaign exist under this manager");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to bring all the list for campaign.");
    }

    @RequestMapping(value = "/create/manlist", method = RequestMethod.GET)
    public ResponseEntity getAllManagersInUser(@RequestParam String regex, HttpServletRequest request){
        List<User> users = userService.getAllUsersByNameRegex(regex);
        if(users != null){
            log.info("CampaignController :: List of Managers for createCampaign");
            return ResponseEntity.ok(users);
        }
        log.info("CampaignController :: Could Not Return a List of Managers");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Load Managers");
    }
}
