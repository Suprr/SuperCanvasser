package team830.SuperCanvasser.Location;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;

@Document(collection = "locations")
@Data
public class Location {

    @org.springframework.data.annotation.Id
    private String _id;
    private double latitude;
    private double longitude;
    private String address;
    private boolean visited;
    private HashMap<String, Boolean>  qNa;
    private boolean anonymous;
    private int index;

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

    public HashMap<String, Boolean> getqNa() {
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
}
