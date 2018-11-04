package team830.SuperCanvasser.Location;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;

@Component
@Service
public class LocationService implements LocationInterface {

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    LocationRepo locationRepo;

    @Override
    public Location addLocation(Location location) {
        log.info("LocationService :: Add Location");
        return locationRepo.save(location);
    }

    
}
