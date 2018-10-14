package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.validation.Valid;
import java.util.List;


@RequestMapping("/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
        private CampaignService campaignService;

    @GetMapping("/{id}")
    public Campaign getCampaign(@PathVariable("id") String id) {
        return (campaignService.findBy_Id(id));
    }

    @RequestMapping(value = "/edit/", method = RequestMethod.POST)
    public Campaign editCampaign(@RequestBody Campaign campaign, BindingResult result) {
        if (result.hasErrors()) {
            return null;
        } else {
            return (campaignService.editCampaign(campaign));
        }
    }

    @RequestMapping(value = "/create/", method = RequestMethod.POST)
    public Campaign createCampaign(@Valid @RequestBody Campaign campaign, BindingResult result) {
        log.debug("Creating campaign");
        if (result.hasErrors()) {
            log.debug("Creating failed");
            return null;
        } else {
            log.debug("Campaign Created");
            return (campaignService.addCampaign(campaign));
        }
    }

    @RequestMapping(value = "/campaigns/", method = RequestMethod.GET)
        public List<Campaign> getAllCampaigns(){
        return (campaignService.findAll());
        }

}
