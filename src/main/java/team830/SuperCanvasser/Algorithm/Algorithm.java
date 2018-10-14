import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.geometry.Point2D;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.stage.Stage;

/**
 *
 * @author Chris
 */
public class Algorithm extends Application {
    public static final double CANVASSAR_SPEED = 1;
    public static final int CANVASSAR_WORKDAY = 480;
    public static final int NUM_LOCATIONS = 100;
    public static final int TIME_PER_VISIT = 15;
    public static final int TABU_ITERATIONS = 200;
    
    
    public static double[][] distMatrix;
    public static Location[] locations;
    public static double totalDistance = 0;
    
    public static ArrayList<ArrayList<Location>> badSol = new ArrayList();
    public static ArrayList<ArrayList<Location>> bestSol = new ArrayList();
    
    @Override
    public void start(Stage primaryStage) throws Exception {
        int width = 1300, height = 650;
        Canvas c = new Canvas(width, height);

        for (int i = 0; i < bestSol.size(); i++) {
            for (int j = 0; j < bestSol.get(i).size(); j++) {
                c.getGraphicsContext2D().fillRect(bestSol.get(i).get(j).x * 6, bestSol.get(i).get(j).y * 6, 2, 2);
                if (j != 0) {
                    c.getGraphicsContext2D().strokeLine(bestSol.get(i).get(j - 1).x * 6, bestSol.get(i).get(j - 1).y * 6, bestSol.get(i).get(j).x * 6, bestSol.get(i).get(j).y * 6);
                }
            }
        }
        
        for (int i = 0; i < badSol.size(); i++) {
            for (int j = 0; j < badSol.get(i).size(); j++) {
                c.getGraphicsContext2D().fillRect(650 + badSol.get(i).get(j).x * 6,badSol.get(i).get(j).y * 6, 2, 2);
                if (j != 0) {
                    c.getGraphicsContext2D().strokeLine(650 + badSol.get(i).get(j - 1).x * 6,  badSol.get(i).get(j - 1).y * 6, 650 + badSol.get(i).get(j).x * 6, badSol.get(i).get(j).y * 6);
                }
            }
        }

        Group root = new Group();
        root.getChildren().add(c);
        primaryStage.setScene(new Scene(root));
        primaryStage.show();
    }
    
    public static void main(String[] args) {
        locations = new Location[NUM_LOCATIONS];
        
        // Randomize lattitude and logitude for testing
        for (int i = 0; i < NUM_LOCATIONS; i++) {
            locations[i] = new Location(Math.random() * 100, Math.random() * 100, i);
        }
        makeDistanceMatrix();
        ArrayList<ArrayList<Location>> canvasserVisits = calculate();
        
        System.out.println("Bad Solution total distance: " + totalDistance + " total canvassers " + canvasserVisits.size());
                
        
        for (int i = 0; i < canvasserVisits.size(); i++) {
            ArrayList tempArr = new ArrayList();
            for (int j = 0; j < canvasserVisits.get(i).size(); j++) {
                Location tempLoc = new Location(canvasserVisits.get(i).get(j).x, canvasserVisits.get(i).get(j).y, canvasserVisits.get(i).get(j).id);
                tempArr.add(tempLoc);
            }
            badSol.add(tempArr);
        }
        optimize(canvasserVisits);
        
        System.out.println("Best Solution total distance: " + totalDistance + " total canvassers " + bestSol.size());
        launch(args);
    }
    
    // Calculate the paths for canvassers by choosing the
    // first location and finding the closest not chosen location
    // Returns an array of canvassers each with an array of locations
    public static ArrayList<ArrayList<Location>> calculate() {
        Location curLocation = locations[0];
        ArrayList<ArrayList<Location>> pathList = new ArrayList();
        ArrayList<Location> curList = new ArrayList();
        curList.add(curLocation);
        double curPathTime = 0;
        int curLocIndex = 0;
        while (!allLocationsVisited(locations)) {
            int closestIndex = findClosestNonVisitedLocation(curLocIndex);
            if (totalTimeWillBeReached(curPathTime, curLocIndex, closestIndex)) {
                pathList.add(curList);
                bestSol.add(curList);
                curList = new ArrayList();
                curPathTime = 0;
            }
            addLocation(curList, closestIndex);
            double time = TIME_PER_VISIT + (distMatrix[curLocIndex][closestIndex]/CANVASSAR_SPEED);
            curPathTime += time;
            totalDistance += time;
        }
        pathList.add(curList);
        bestSol.add(curList);
        return pathList;
    }
    
    // Optimizes the simple solution using Tabu Search
    static void optimize(ArrayList<ArrayList<Location>> visits) {
        double tabuMatrix[][] = new double[locations.length+1][locations.length+1];
        double cost = totalDistance;
        int indA = -1, indB = -1, rF = -1, rT = -1;
        ArrayList<Location> pathFrom, pathTo;
        int vehIndexFrom, vehIndexTo;
        double bestNCost, nCost;
        for (int i = 0; i < TABU_ITERATIONS; i++) {
            bestNCost = Double.MAX_VALUE;
            for (vehIndexFrom = 0; vehIndexFrom < visits.size(); vehIndexFrom++) {
                pathFrom = visits.get(vehIndexFrom);
                for (int j = 1; j < pathFrom.size() - 1; j++) {
                    for (vehIndexTo =0; vehIndexTo < visits.size(); vehIndexTo++) {
                        pathTo = visits.get(vehIndexTo); 
                        for(int k = 0; k < pathTo.size() - 1; k++) {
                            if (((vehIndexTo == vehIndexFrom) && ((k == j) || (k == j - 1))) == false) {
                                double dist1 = distMatrix[pathFrom.get(j - 1).id][pathFrom.get(j).id];
                                double dist2 = distMatrix[pathFrom.get(j).id][pathFrom.get(j+1).id];
                                double dist3 = distMatrix[pathTo.get(k).id][pathTo.get(k+1).id];
                                
                                double addCost1 = distMatrix[pathFrom.get(j-1).id][pathFrom.get(j+1).id];
                                double addCost2 = distMatrix[pathTo.get(k).id][pathFrom.get(j).id];
                                double addCost3 = distMatrix[pathFrom.get(j).id][pathTo.get(k + 1).id];
                                
                                if ((tabuMatrix[pathFrom.get(j-1).id][pathFrom.get(j+1).id] != 0) || (tabuMatrix[pathTo.get(k).id][pathFrom.get(j).id] != 0) || (tabuMatrix[pathFrom.get(j).id][pathTo.get(k+1).id] != 0)) {
                                    break;
                                }
                                
                                nCost = addCost1 + addCost2 + addCost3 - dist1 -dist2 -dist3;
                                
                                if (nCost < bestNCost) {
                                    bestNCost = nCost;
                                    indA = j;
                                    indB = k;
                                    rF = vehIndexFrom;
                                    rT = vehIndexTo;
                                }
                            }
                        }
                    }
                }
            }
            for (int j = 0; j< tabuMatrix.length; j++) {
                for (int k = 0; k < tabuMatrix.length; k++) {
                    if (tabuMatrix[j][k] > 0) {
                        tabuMatrix[j][k]--;
                    }
                }
            }
            pathFrom = visits.get(rF);
            pathTo = visits.get(rT);
            
            Location tempLoc = pathFrom.get(indA);

            pathFrom.remove(indA);
            
            if (rF == rT) {
                if (indA < indB) {
                    pathTo.add(indB + 1, tempLoc);
                }
                else {
                    pathTo.add(indB + 1, tempLoc);
                }
            }
            else {
                pathTo.add(indB + 1, tempLoc);
            }
            
            visits.set(rF, pathFrom);
            visits.set(rT, pathTo);
            
            cost += bestNCost;
            
            if (cost < totalDistance) {
                totalDistance = cost;
                bestSol = visits;
            }
            else if (cost == totalDistance) {
                break;
            }
        }   
        visits = bestSol;
        cost = totalDistance;
    }
    
    // Calculates the distance between two locations
    // adds x component with y component of distance between 2 locations
    static double manhattanDistance(Location loc1, Location loc2) {
        return Math.abs(loc1.x - loc2.x) + Math.abs(loc1.y - loc2.y);
    }
    
    // Creates a distance matrix used in our calculations
    static double[][] makeDistanceMatrix() {
        int numElements = locations.length;
        distMatrix = new double[numElements][numElements];
        double distance;
        
        // Matrix does not need a value when i == j, and only needs to 
        // calculate for one side of the diagonal since it is reflected
        for (int i = 0; i < numElements ; i++) {
            for (int j = i + 1; j < numElements; j++) {
                distance = manhattanDistance(locations[i], locations[j]);
                distMatrix[i][j] = distance;
                distMatrix[j][i] = distance;
            }
        }
        return distMatrix;
    }

    // Checks if there was a location that was not visited yet
    static boolean allLocationsVisited(Location[] locations) {
        for (Location l : locations) {
            if (!l.visited) {
                return false;
            }
        }
        return true;
    }

    // Finds the location that is the closest and not visited to 
    // the current location
    static int findClosestNonVisitedLocation(int index) {
        double curLength = Double.MAX_VALUE;
        int curIndex = 0;
        for (int i = 0; i < distMatrix.length; i++) {
            double compareValue = distMatrix[index][i];
            if ((compareValue < curLength) && (compareValue != 0) &&(!locations[i].visited)) {
                curIndex = i;
            }
        }
        return curIndex;
    }
    
    // Adds location to the ArrayList and changes the value
    // of the location's boolean visited to true
    static void addLocation(ArrayList listOfLoc, int index) {
        listOfLoc.add(locations[index]);
        locations[index].visited = true;
    }

    static boolean totalTimeWillBeReached(double curTime, int curIndex, int closestIndex) {
        if (curTime + TIME_PER_VISIT + (distMatrix[curIndex][closestIndex]/CANVASSAR_SPEED) > CANVASSAR_WORKDAY) {
            return true;
        }
        return false;
    }
}
