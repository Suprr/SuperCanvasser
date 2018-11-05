package team830.SuperCanvasser.Canvasser;

import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Variable.Variable;

import java.util.List;

@Service
public interface AvailabilityInterface {
    Availability editAvailability(Availability availability);

    Availability addAvailability(Availability availability);

    Availability findByCanvasserId(String id);

    List<Availability> findByCanvasserIdEquals(List<String> id);
}
