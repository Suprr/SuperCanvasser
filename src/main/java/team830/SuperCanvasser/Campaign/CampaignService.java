package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;

import java.util.List;

@Service
public class CampaignService implements CampaignInterface {
    @Autowired
    private CampaignRepo campaignRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public Campaign editCampaign(Campaign campaign) {
        return campaignRepo.save(campaign);
    }

    @Override
    public Campaign addCampaign(Campaign campaign) {
        return campaignRepo.save(campaign);
    }

    @Override
    public Campaign findBy_Id(String id) {
        return campaignRepo.findBy_id(id);
    }

    @Override
    public List<Campaign> findAllbyManager(String managerId){
        return campaignRepo.findAllByManagersContains(managerId);
    }

}
