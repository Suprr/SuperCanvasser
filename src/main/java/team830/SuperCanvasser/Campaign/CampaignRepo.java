package team830.SuperCanvasser.Campaign;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignRepo extends MongoRepository<Campaign, ObjectId> {
//        Campaign findByManagerId(ObjectId id);
}

