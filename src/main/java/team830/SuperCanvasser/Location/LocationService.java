package team830.SuperCanvasser.Location;

import com.google.common.primitives.Doubles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;
import team830.SuperCanvasser.Task.Task;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService implements LocationInterface{
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);


    @Autowired
    LocationRepo locationRepo;

    @Override
    public List<Location> findLocationsById(List<String> locs){
        List<Location> locations = new ArrayList<>();
        for(String loc : locs){
            locations.add(locationRepo.findLocationBy_id(loc));
        }
        return locations;
    }

    @Override
    public Location updateLocation(Location location){
        Location updatedLocation = null;
        if(locationRepo.findLocationBy_id(location.get_id()) != null){
            updatedLocation = locationRepo.save(location);
            return updatedLocation;
        }
        return updatedLocation;

    }
    public List<Double> getAllRatings(List<Task> tasks){
        List<Double> ratings = new ArrayList<>();
        for(int i = 0; i < tasks.size(); i++){
            List<Location> locations = findLocationsById(tasks.get(i).getLocations());
            for(int k = 0; k < locations.size(); k++){
                ratings.add((double) locations.get(k).getRating());
            }
        }
        return ratings;
    }
}
