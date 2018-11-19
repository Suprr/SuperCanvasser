package team830.SuperCanvasser.Location;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "locations")
@Data
public class Location {

    @Id
    private String _id;
    private double latitude;
    private double longitude;
    private String address;
    private boolean visited;
    private Map<String, Boolean> qNa;
    private boolean anonymous;
    private int index;
    private int rating;

    public Location(String _id, double latitude, double longitude, String address, boolean visited, Map<String, Boolean> qNa, boolean anonymous, int index) {
        this._id = _id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.visited = visited;
        this.qNa = new HashMap<>(qNa);
        this.anonymous = anonymous;
        this.index = index;
    }

    public Location( double latitude, double longitude, String address) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.visited = false;
    }


    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Map<String, Boolean> getqNa() {
        return qNa;
    }

    public void setqNa(HashMap<String, Boolean> qNa) {
        this.qNa = qNa;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isVisited() {
        return visited;
    }

    public void setVisited(boolean visited) {
        this.visited = visited;
    }

    public boolean isAnonymous() { return anonymous; }

    public void setAnonymous(boolean anonymous) { this.anonymous = anonymous; }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}