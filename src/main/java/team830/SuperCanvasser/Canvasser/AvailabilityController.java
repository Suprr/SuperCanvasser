package team830.SuperCanvasser.Canvasser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;
import team830.SuperCanvasser.Variable.Variable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public ResponseEntity addVar(@Valid @RequestBody Availability availability, BindingResult result) {
        if (result.hasErrors()) {
            log.info("AvailabilityController : Availability add has failed");
            return null;
        } else {
            log.info("AvailabilityController : Availability has been added");
            return ResponseEntity.ok(AvailabilityService.addAvailability(availability));
        }
    }

    @GetMapping("/user/{id}")
    public Availability getAvailabilitiesByCanvasser(@PathVariable("id") String id) {
        log.info("AvailabilityController : Getting all availabilities by canvasser");
        return (AvailabilityService.findByCanvasserId(id));
    }

    @PostMapping("/user")
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

