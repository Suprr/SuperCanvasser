package team830.SuperCanvasser.Campaign;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CampaignInterface {
    Campaign editCampaign(Campaign campaign);
    List<Campaign> findAllbyManager(String managerId);
    Campaign addCampaign(Campaign campaign);
    Campaign findBy_Id(String id);
    List<Campaign> findAll();
}
