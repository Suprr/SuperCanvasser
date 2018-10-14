package team830.SuperCanvasser.Campaign;

import com.mongodb.DBCollection;
import com.mongodb.WriteResult;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.Query;
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
    public List<Campaign> findAll() {
        return campaignRepo.findAll();
    }

    @Override
    public Campaign addCampaign(Campaign campaign) {
        return campaignRepo.save(campaign);
    }

    @Override
    public Campaign findBy_Id(String id) {
        return campaignRepo.findBy_id(id);
    }
//
//    public Campaign getFromManagersId(String _id) {
//        return campaignRepo.findAllById(_id));
//    }
//

}
