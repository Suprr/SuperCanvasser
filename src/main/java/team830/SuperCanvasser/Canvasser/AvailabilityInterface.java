package team830.SuperCanvasser.Canvasser;

import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Variable.Variable;

import java.util.List;

@Service
public interface AvailabilityInterface {
    Availability editAvailability(Availability availability);

    Availability addAvailability(Availability availability);

    List<Availability> findByCanvasserId(String id);
}
