package team830.SuperCanvasser.Availability;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.UserController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RequestMapping("/avail")
@RestController
public class AvailabilityController {

    @Autowired
    private AvailabilityService AvailabilityService;

    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editAvailability(@Valid @RequestBody Availability availability, HttpServletRequest request, BindingResult result) {
        if (result.hasErrors()) {
            log.info("AvailabilityController : Availability edit has failed");
            return null;
        } else if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("AvailabilityController : Availability has been edited");
            return ResponseEntity.ok(AvailabilityService.editAvailability(availability));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addVar(@Valid @RequestBody Availability availability, HttpServletRequest request, BindingResult result) {
        if (result.hasErrors()) {
            log.info("AvailabilityController : Availability add has failed");
            return null;
        } else if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("AvailabilityController : Availability has been added");
            return ResponseEntity.ok(AvailabilityService.addAvailability(availability));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public ResponseEntity getAvailabilitiesByCanvasser(@RequestParam String id, HttpServletRequest request) {
        if (UserController.getRoleInSession(request).equals(Role.CANVASSER)) {
            log.info("AvailabilityController : Getting all availabilities by canvasser");
            return ResponseEntity.ok(AvailabilityService.findByCanvasserId(id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
    // returns List<Availability>
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity getAvailForListCanvassers(@Valid @RequestBody ArrayStringWrapper id, HttpServletRequest request, BindingResult result) {
        if(result.hasErrors()){
            log.info("AvailabilityController : Fetching canvassers availabilities by ids failed.");
            return null;
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("AvailabilityController : Fetching canvassers availabilities by id");
            return ResponseEntity.ok(AvailabilityService.findByCanvasserIdEquals(id.getStrings()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
}

