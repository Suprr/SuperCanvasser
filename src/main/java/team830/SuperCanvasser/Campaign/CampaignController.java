package team830.SuperCanvasser.Campaign;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class CampaignController {
        @Autowired
        private CampaignService campaignService;

//        @GetMapping("/campaign/")
//        public Campaign getCampaign(@RequestParam(value="id")ObjectId id) {
//            return(campaignService.findByManagerID(id));
//        }

        @PostMapping("/campaign/edit")
        public Campaign editCampaign(@RequestParam(value="campaign") Campaign campaign){
            return(campaignService.editCampaign(campaign));
        }

        @GetMapping("/campaigns/")
        public List<Campaign> getAllCampaigns(){
            return(campaignService.getAllCampaigns());
        }

}
