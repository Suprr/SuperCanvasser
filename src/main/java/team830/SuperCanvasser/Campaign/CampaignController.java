package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;
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
    public ResponseEntity getCampaign(@RequestParam String _id, HttpServletRequest request) {
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

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editCampaign(@Valid @RequestBody Campaign campaign, HttpServletRequest request) {
            if(campaign.equals((request.getSession().getAttribute("currentCampaign")))){
                log.info("CampaignController :: Campaign Edited");
                return ResponseEntity.ok(campaignService.editCampaign(campaign));
            }
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to edit");
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
        if(campaignService.findAllbyManager(_id) != null){
            log.info("CampaignController :: Campaign is returning all the list found by manager");
            return ResponseEntity.ok(campaignService.findAllbyManager(_id));
        }
        log.info("CampaignController :: No Campaign exist under this manager");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to bring all the list for campaign.");
    }

}
