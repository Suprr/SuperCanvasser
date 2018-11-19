package team830.SuperCanvasser.Result;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepo extends MongoRepository<Result, String> {
    Result findResultByCampaignId(String campaignId);
}
