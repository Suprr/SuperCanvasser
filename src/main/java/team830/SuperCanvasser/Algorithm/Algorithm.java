

import java.util.ArrayList;

/**
 *
 * @author Chris
 */
public class Algorithm {
    public static final double CANVASSAR_SPEED = 1;
    public static final int CANVASSAR_WORKDAY = 480;
    public static final int NUM_LOCATIONS = 100;
    public static final int TIME_PER_VISIT = 15;
    public static final int TABU_ITERATIONS = 200;
    
    
    public static double[][] distMatrix;
    public static Location[] locations;
    public static double totalDistance = 0;
    
    public static ArrayList<ArrayList<Location>> bestSol = new ArrayList();
    
    public static void main(String[] args) {
        locations = new Location[NUM_LOCATIONS];
        
        // Randomize lattitude and logitude for testing
        for (int i = 0; i < NUM_LOCATIONS; i++) {
            locations[i] = new Location(Math.random() * 100, Math.random() * 100, i);
        }
        makeDistanceMatrix();
        ArrayList<ArrayList<Location>> canvasserVisits = calculate();
        for(int i = 0; i < canvasserVisits.size();i++){
            for(int j =0; j<canvasserVisits.get(i).size();j++) {
                System.out.print(canvasserVisits.get(i).get(j).x + " " + canvasserVisits.get(i).get(j).x);
            }
            System.out.println();
        }
        System.out.println(totalDistance);
        
        optimize(canvasserVisits);
        
        for(int i = 0; i < canvasserVisits.size();i++){
            for(int j =0; j<canvasserVisits.get(i).size();j++) {
                System.out.print(canvasserVisits.get(i).get(j).x + " " + canvasserVisits.get(i).get(j).x);
            }
            System.out.println();
        }
        System.out.println(totalDistance);
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
                curList = new ArrayList();
                curPathTime = 0;
            }
            addLocation(curList, closestIndex);
            double time = TIME_PER_VISIT + (distMatrix[curLocIndex][closestIndex]/CANVASSAR_SPEED);
            curPathTime += time;
            totalDistance += time;
        }
        pathList.add(curList);
        return pathList;
    }
    
    // Optimizes the simple solution using Tabu Search
    static void optimize(ArrayList<ArrayList<Location>> visits) {
        double tabuMatrix[][] = new double[locations.length][locations.length];
        double cost = totalDistance;
        int indA = -1, indB = -1, rF = -1, rT = -1;
        ArrayList<Location> pathFrom, pathTo;
        for (int i = 0; i < TABU_ITERATIONS; i++) {
            double bestNCost = Double.MAX_VALUE;
            for (int j = 0; j < visits.size(); j++) {
                pathFrom = visits.get(j);
                for (int k = 0; k < pathFrom.size(); k++) {
                    for (int l =0; l < visits.size(); l++) {
                        pathTo = visits.get(l); 
                        for(int m = 0; m < pathTo.size(); m++) {
                            if ((j == l) && !((k == m) || (k == m - 1))) {
                                double dist1 = distMatrix[pathFrom.get(m - 1).id][pathFrom.get(m).id];
                                double dist2 = distMatrix[pathFrom.get(m).id][pathFrom.get(m+1).id];
                                double dist3 = distMatrix[pathFrom.get(k).id][pathFrom.get(k+1).id];
                                
                                double addCost1 = distMatrix[pathFrom.get(m-1).id][pathFrom.get(m+1).id];
                                double addCost2 = distMatrix[pathFrom.get(k).id][pathFrom.get(m).id];
                                double addCost3 = distMatrix[pathFrom.get(m).id][pathFrom.get(k + 1).id];
                                
                                if ((tabuMatrix[pathFrom.get(m-1).id][pathFrom.get(m+1).id] != 0) || (tabuMatrix[pathFrom.get(k).id][pathFrom.get(m).id] != 0) || (tabuMatrix[pathFrom.get(m).id][pathFrom.get(k+1).id] != 0)) {
                                    break;
                                }
                                
                                double nCost = addCost1 + addCost2 + addCost3 - dist1 -dist2 -dist3;
                                
                                if (nCost < bestNCost) {
                                    bestNCost = nCost;
                                    indA = m;
                                    indB = k;
                                    rF = j;
                                    rT = l;
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
            visits.remove(rF);
            visits.remove(rT);
            
            Location tempLoc = pathFrom.get(indA);
            
            int lB = pathFrom.get(indA - 1).id;
            int lA = pathFrom.get(indA + 1).id;
            int lF = pathTo.get(indB).id;
            int lG = pathTo.get(indB + 1).id;
            
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
                for (int x = 0; x < visits.size(); x++) {
                    visits.get(x).clear();
                    if (visits.get(x) != null) {
                        for (int y = 0; y < visits.get(x).size(); y++) {
                            Location l = visits.get(x).get(y);
                            bestSol.get(x).add(l);
                        }
                    }
                }
            }
            
        }       
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
