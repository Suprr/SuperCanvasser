/**
 *
 * @author Chris
 */
public class Algorithm {
    public final double CANVASSAR_SPEED = 0;
    public final double CANVASSAR_WORKDAY = 8;
    public static final int NUM_LOCATIONS = 100;
    public static void main(String[] args) {
        Location[] locations = new Location[NUM_LOCATIONS];
        for (Location location : locations) {
            location = new Location(Math.random() * 100, Math.random() * 100);
        }
        
        calculate(locations);
    }

    public static void calculate(Location[] locations) {
        
    }
    
    double manhattanDistance(Location loc1, Location loc2) {
        return Math.abs(loc1.getX() - loc2.getX()) + Math.abs(loc1.getY() - loc2.getY());
    }
    
    double[][] makeDistanceMatrix(Location[] locations) {
        int numElements = locations.length;
        double[][] distanceMatrix = new double[numElements][numElements];
        double distance;
        for (int i = 0; i <= numElements; i++) {
            for (int j = i + 1; j <= numElements; j++) {
                distance = manhattanDistance(locations[i], locations[j]);
                distanceMatrix[i][j] = distance;
                distanceMatrix[i][j] = distance;
            }
        }
        return distanceMatrix;
    }
}