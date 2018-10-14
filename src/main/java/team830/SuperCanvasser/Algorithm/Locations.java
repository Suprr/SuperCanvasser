

/**
 *
 * @author Chris
 */
public class Location {
    public double x;
    public double y;
    public boolean visited;
    public int id;

    Location(double x, double y, int id) {
    this.x = x;
    this.y = y;
    visited = false;
    this.id = id;
    }
    
    public void visit() {
        visited = true;
    }
}

