package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import team830.SuperCanvasser.CurrentObject;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.validation.Valid;


@RequestMapping("/manager/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
        private CampaignService campaignService;

    @RequestMapping("/view")
    public ResponseEntity getCampaign(@RequestParam String id) {
        Campaign campaign = campaignService.findBy_Id(id);
        log.info("CampaignController :: Getting Campaign");
        if(campaign != null){
            CurrentObject.setCurrentCamp(campaign);
            log.info("CampaignController :: Campaign Found");
            return ResponseEntity.ok(campaign);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Campaign Not Found");
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editCampaign(@RequestBody Campaign campaign) {
            if(campaign.equals(CurrentObject.getCurrentCamp())){
                log.info("CampaignController :: Campaign Edited");
                return ResponseEntity.ok(campaignService.editCampaign(campaign));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to edit");
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createCampaign(@Valid @RequestBody Campaign campaign) {
//            if(request.getSession().getAttribute(""))
            log.info("CampaignController :: Campaign has been created");
            return ResponseEntity.ok(campaignService.addCampaign(campaign));
    }

    //campaign array(list) will be passed to the front as a responseEntity
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity getAllCampaigns(){
        return ResponseEntity.ok(campaignService.findAll());
    }

}
