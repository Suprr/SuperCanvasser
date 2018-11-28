package team830.SuperCanvasser.Campaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import team830.SuperCanvasser.Status;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Task.TaskService;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.User.UserController;
import team830.SuperCanvasser.User.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/manager/campaign")
@RestController
public class CampaignController {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Autowired
    private CampaignService campaignService;
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    //id = campaignId. this returns the list that has campaign and managers(User)
    @RequestMapping(value = "/view", method = RequestMethod.GET)
    public ResponseEntity viewCampaign(@RequestParam String _id, HttpServletRequest request) {
        Campaign campaign = campaignService.findBy_Id(_id);
        log.info("CampaignController :: Getting Campaign");
        if(campaign == null){
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Campaign Not Found");
        }
        else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            request.getSession().setAttribute("currentCampaign", campaign);
            log.info("CampaignController :: Campaign Found");
            List<Object> returnList = new ArrayList<>();
            returnList.add(campaign);
            // getting the users for managers to display information
            for (String s : campaign.getManagers()) {
                returnList.add(userService.getUserBy_id(s));
            }
            return ResponseEntity.ok(returnList);
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    //campaign array(list) will be passed to the front as a responseEntity
    // _id = managerID
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity getAllCampaigns(@RequestParam String _id, HttpServletRequest request){
        List<Campaign> campaigns = campaignService.findAllbyManager(_id);
        if(campaigns == null){
            log.info("CampaignController :: No Campaign exist under this manager");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to bring all the list for campaign.");
        }
        else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("CampaignController :: Campaign is returning all the list found by manager");
            return ResponseEntity.ok(campaigns);
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/view/man", method = RequestMethod.POST)
    public ResponseEntity getManagerForView(@RequestBody List<String> manId, HttpServletRequest request){
        List<User> manList = new ArrayList<>();
        if(manId.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Manager Not Found for Campaign");
        }
        else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            for (String id : manId) {
                manList.add(userService.getUserBy_id(id));
            }
            log.info("CampaignController :: Getting the Managers (User) for Campaign");
            return ResponseEntity.ok(manList);
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }


    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity editCampaign(@Valid @RequestBody Campaign campaign, HttpServletRequest request, BindingResult result) {
        Campaign originalCampaign = campaignService.findBy_Id(campaign.get_id());

        if(!campaign.getStatus().equals(Status.INACTIVE)){
            log.info("CampaignController :: Campaign is Active or finished.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Campaign Cannot be edited");
        } // checking whether campaign exist in DB
        else if (originalCampaign == null || result.hasErrors()) {
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to edit");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("CampaignController :: Campaign has been edited");
            return ResponseEntity.ok(campaignService.editCampaign(originalCampaign, campaign));
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createCampaign(@RequestBody Campaign campaign, HttpServletRequest request, BindingResult result) {
        if(result.hasErrors()){
            log.info("CampaignController :: Campaign Not Found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create campaign");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("CampaignController :: Campaign has been created");
            Campaign newCampaign = campaignService.addCampaign(campaign);
            if(newCampaign == null){
                log.info("CampaignController :: Not Enough Canvassers");
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Enough Canvasssers");
            }
            log.info("CampaignController :: Campaign has been created");
            return ResponseEntity.ok(newCampaign);
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }

    @RequestMapping(value = "/create/manlist", method = RequestMethod.GET)
    public ResponseEntity getAllManagersInUser(@RequestParam String regex, HttpServletRequest request){
        List<User> users = userService.getAllUsersByNameRegex(regex);
        if(users == null){
            log.info("CampaignController :: Could Not Return a List of Managers");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to Load Managers");
        } else if (UserController.getRoleInSession(request).equals(Role.MANAGER)) {
            log.info("CampaignController :: List of Managers for createCampaign");
            return ResponseEntity.ok(users);
        }
        log.info("CampaignController :: Unauthorized Acceess");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Acceess");
    }
}