package team830.SuperCanvasser.Location;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import team830.SuperCanvasser.User.User;

@Repository
public interface LocationRepo extends MongoRepository<Location, String> {
    Location findLocationBy_id(String _id);

}
