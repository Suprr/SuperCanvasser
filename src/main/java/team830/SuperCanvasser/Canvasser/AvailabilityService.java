package team830.SuperCanvasser.Canvasser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Variable.Variable;

import java.util.List;

@Service
public class AvailabilityService implements AvailabilityInterface {
    @Autowired
    private AvailabilityRepo availabilityRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public Availability editAvailability(Availability availability) {
        log.info("Edit Availability - Service");
        return availabilityRepo.save(availability);
    }

    public Availability addAvailability(Availability availability) {
        log.info("Add Availability - Service");
        return availabilityRepo.insert(availability);
    }

    public List<Availability> findByCanvasserId(String id) {
        log.info("Finding Canvassers Tasks - Service");
        return availabilityRepo.findByCanvasserId(id);
    }

}
