package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RequestMapping("/manager/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
        private CampaignService campaignService;

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
    public ResponseEntity createCampaign(@Valid @RequestBody Campaign campaign, HttpServletRequest request) {
//            if(request.getSession().getAttribute(""))
            log.info("CampaignController :: Campaign has been created");
            return ResponseEntity.ok(campaignService.addCampaign(campaign));
    }

    //campaign array(list) will be passed to the front as a responseEntity
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public ResponseEntity getAllCampaigns(@RequestBody String _id, HttpServletRequest request){
        if(campaignService.findAllbyManager(_id) != null){
            log.info("CampaignController :: Campaign is returning all the list found by manager");
            return ResponseEntity.ok(campaignService.findAllbyManager(_id));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to bring all the list for campaign");

    }

}
