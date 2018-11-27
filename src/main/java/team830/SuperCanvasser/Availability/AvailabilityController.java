package team830.SuperCanvasser.Availability;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RequestMapping("/avail")
@RestController
public class AvailabilityController {

    @Autowired
    private AvailabilityService AvailabilityService;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Availability editAvailability(@Valid @RequestBody Availability availability, BindingResult result) {
        if (result.hasErrors()) {
            log.info("AvailabilityController : Availability edit has failed");
            return null;
        } else {
            log.info("AvailabilityController : Availability has been edited");
            return AvailabilityService.editAvailability(availability);
        }
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addAvailability(@RequestBody Availability availability, BindingResult result) {
        if (result.hasErrors()) {
            log.info("AvailabilityController : Availability add has failed");
            return null;
        } else {
            log.info("AvailabilityController : Availability has been added");
            return ResponseEntity.ok(AvailabilityService.addAvailability(availability));
        }
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public Availability getAvailabilitiesByCanvasser(@RequestParam String _id) {
        log.info("AvailabilityController : Getting all availabilities by canvasser");
        return (AvailabilityService.findByCanvasserId(_id));
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public List<Availability> getAvailForListCanvassers(@Valid @RequestBody ArrayStringWrapper id, BindingResult result) {
        if(result.hasErrors()){
            log.info("AvailabilityController : Fetching canvassers availabilities by ids failed.");
            return null;
        }else {
            log.info("AvailabilityController : Fetching canvassers availabilities by id");
//            log.info(id.toString());
            return (AvailabilityService.findByCanvasserIdEquals(id.getStrings()));
        }
    }
}

