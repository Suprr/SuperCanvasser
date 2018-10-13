/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Algorithm;

import java.util.ArrayList;

/**
 *
 * @author Chris
 */
public class Main {
    public static final double CANVASSAR_SPEED = 1;
    public static final int CANVASSAR_WORKDAY = 480;
    public static final int NUM_LOCATIONS = 100;
    public static final int TIME_PER_VISIT = 15;
    public static double[][] distMatrix;
    
    public static void main(String[] args) {
        Location[] locations = new Location[NUM_LOCATIONS];
        
        // Randomize lattitude and logitude for testing
        for (int i = 0; i < NUM_LOCATIONS; i++) {
            locations[i] = new Location(Math.random() * 100, Math.random() * 100);
        }
        distMatrix = makeDistanceMatrix(locations);

        ArrayList<ArrayList<Location>> canvasserVisits = calculate(locations);
        System.out.print("same");
        for(int i = 0; i < canvasserVisits.size();i++){
            for(int j =0; j<100;j++) {
                System.out.print(canvasserVisits.get(i).get(i));
            }
            System.out.println();
        }
    }
    
    // Calculate the paths for canvassers by choosing the
    // first location and finding the closest not chosen location
    // Returns an array of canvassers each with an array of locations
    public static ArrayList<ArrayList<Location>> calculate(Location[] locations) {
        Location curLocation = locations[0];
        ArrayList<ArrayList<Location>> pathList = new ArrayList();
        ArrayList<Location> curList = new ArrayList();
        curList.add(curLocation);
        double curPathTime = 0;
        int curLocIndex = 0;
        while (!allLocationsVisited(locations)) {
            int closestIndex = findClosestNonVisitedLocation(curLocIndex);
            System.out.print(closestIndex);
            if (totalTimeWillBeReached(curPathTime, curLocIndex, closestIndex)) {
                pathList.add(curList);
                curList = new ArrayList();
                curPathTime = 0;
            }
            addLocation(curList, closestIndex, locations);
        }
        pathList.add(curList);
        return pathList;
    }
    
    // Optimizes the simple solution using Tabu Search
    static void optimize(double[][] dist) {
        
    }
    
    // Calculates the distance between two locations
    // adds x component with y component of distance between 2 locations
    static double manhattanDistance(Location loc1, Location loc2) {
        return Math.abs(loc1.x - loc2.x) + Math.abs(loc1.y - loc2.y);
    }
    
    // Creates a distance matrix used in our calculations
    static double[][] makeDistanceMatrix(Location[] locations) {
        int numElements = locations.length;
        double[][] distMatrix = new double[numElements][numElements];
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

    static boolean allLocationsVisited(Location[] locations) {
        for (Location l : locations) {
            if (!l.visited) {
                return false;
            }
        }
        return true;
    }

    static int findClosestNonVisitedLocation(int index) {
        double curLength = Double.MAX_VALUE;
        int curIndex = 0;
        for (int i = 0; i < distMatrix.length; i++) {
            double compareValue = distMatrix[index][i];
            if ((compareValue < curLength) && (compareValue != 0)) {
                curIndex = i;
            }
        }
        return curIndex;
    }
    
    // Adds location to the ArrayList and changes the value
    // of the location's boolean visited to true
    static void addLocation(ArrayList listOfLoc, int index, Location[] locations) {
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
