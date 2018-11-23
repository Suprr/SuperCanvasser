package team830.SuperCanvasser.Location;

import com.google.common.primitives.Doubles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.Task.Task;

import java.util.ArrayList;
import java.util.List;

@Service
public class LocationService implements LocationInterface{

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
    public double [] getAllRatings(List<Task> tasks){
        List<Double> ratings = new ArrayList<>();
        for(int i = 0; i < tasks.size(); i++){
            List<Location> locations = findLocationsById(tasks.get(i).getLocations());
            for(int k = 0; k < locations.size(); k++){
                ratings.add((double)locations.get(k).getRating());
            }
        }
        return Doubles.toArray(ratings);
    }
}
