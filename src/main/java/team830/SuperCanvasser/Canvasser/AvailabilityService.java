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
        if (availability.get_id() != null){
            if (availabilityRepo.existsById(availability.get_id())){
                log.debug("Availability exists");
                return availabilityRepo.save(availability);
            }
        }else{
            log.debug("Availability doesn't exist");
        }
        return null;
    }

    public Availability addAvailability(Availability availability) {
        log.info("Add Availability - Service");
        return availabilityRepo.insert(availability);
    }

    public List<Availability> findByCanvasserIdEquals(List<String> id) {
        log.info("Finding Canvassers Tasks - Service");
        log.info(id.toString());
        return availabilityRepo.findByCanvasserIdEquals(id);
    }

    public Availability findByCanvasserId(String id) {
        log.info("Finding Canvassers Tasks - Service");
        return availabilityRepo.findByCanvasserId(id);
    }

}
