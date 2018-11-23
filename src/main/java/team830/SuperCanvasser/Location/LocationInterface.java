package team830.SuperCanvasser.Location;

import java.util.List;

public interface LocationInterface{
    List<Location> findLocationsById(List<String> locs);
    Location updateLocation(Location location);
}
