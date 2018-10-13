package team830.SuperCanvasser.Campaign;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CampaignService implements CampaignInterface {
    @Autowired
    private CampaignRepo campaignRepo;

    @Override
    public Campaign editCampaign(Campaign campaign) {
        return campaignRepo.save(campaign);
    }

    @Override
    public List<Campaign> getAllCampaigns() {
        return campaignRepo.findAll();
    }

//    public Campaign findByManagerID(ObjectId id) {
//        return campaignRepo.findByManagerId(id);
//    }


}
