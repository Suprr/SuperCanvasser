package team830.SuperCanvasser.Algorithm;

import java.util.ArrayList;
import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.stage.Stage;

/**
 *
 * @author Chris
 */
public class Algorithm extends Application {
    // Walking speed in respect to Lattitude and Longitude is 0.05/69
    // degrees of Lattitude/Longitude a minute
    public static final double CANVASSER_SPEED = (0.05/69);
    public static final int CANVASSER_WORKDAY = 480;
    public static final int NUM_LOCATIONS = 100;
    public static final int TIME_PER_VISIT = 15;
    
    public static double[][] distMatrix;
    public static Location[] locations;
    public static double totalDistance = 0;
    
    public static ArrayList<ArrayList<Location>> badSol = new ArrayList();
    public static ArrayList<ArrayList<Location>> bestSol = new ArrayList();
    
    // Final comparison from beginning algorithm vs final optimized algorithm
    @Override
    public void start(Stage primaryStage) throws Exception {
        int width = 1300, height = 650;
        Canvas c = new Canvas(width, height);

        // Graph and connect the best solution on the left
        for (int i = 0; i < bestSol.size(); i++) {
            for (int j = 0; j < bestSol.get(i).size(); j++) {
                c.getGraphicsContext2D().fillRect(bestSol.get(i).get(j).x * 5000, bestSol.get(i).get(j).y * 5000, 2, 2);
                if (j != 0) {
                    c.getGraphicsContext2D().strokeLine(bestSol.get(i).get(j - 1).x * 5000, bestSol.get(i).get(j - 1).y * 5000, bestSol.get(i).get(j).x * 5000, bestSol.get(i).get(j).y * 5000);
                }
            }
        }
        
        // Graph and connect the first solution on the right
        for (int i = 0; i < badSol.size(); i++) {
            for (int j = 0; j < badSol.get(i).size(); j++) {
                c.getGraphicsContext2D().fillRect(650 + badSol.get(i).get(j).x * 5000,badSol.get(i).get(j).y * 5000, 2, 2);
                if (j != 0) {
                    c.getGraphicsContext2D().strokeLine(650 + badSol.get(i).get(j - 1).x * 5000,  badSol.get(i).get(j - 1).y * 5000, 650 + badSol.get(i).get(j).x * 5000, badSol.get(i).get(j).y * 5000);
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
            locations[i] = new Location(Math.random() * 0.1, Math.random() * 0.1, i);
        }
        
        
        makeDistanceMatrix();
        ArrayList<ArrayList<Location>> canvasserVisits = calculate();
        
        // Calculates total distance + route of first solution
        System.out.println("Bad Solution total distance: " + totalDistance + " total canvassers " + canvasserVisits.size());
        for (int i = 0; i < canvasserVisits.size(); i++) {
            System.out.print("Canvasser " + i+ ": ");
            System.out.println(totalDistOfCanvasser(canvasserVisits.get(i)));
        }
        
        // Clones the first solution so we can graph it later
        for (int i = 0; i < canvasserVisits.size(); i++) {
            ArrayList tempArr = new ArrayList();
            for (int j = 0; j < canvasserVisits.get(i).size(); j++) {
                Location tempLoc = new Location(canvasserVisits.get(i).get(j).x, canvasserVisits.get(i).get(j).y, canvasserVisits.get(i).get(j).id);
                tempArr.add(tempLoc);
            }
            badSol.add(tempArr);
        }
        
        optimize(canvasserVisits);
        
        // Calculate if canvassers can complete the campaign
        int numConsecutiveDates = (int) ((Math.random() * 4) + 4);
        int numCanvassers = (int) ((Math.random() * 5) + 3);
        boolean[][] canvasserAvailabilityDates = new boolean[numCanvassers][numConsecutiveDates];
        for (boolean[] randomDate : canvasserAvailabilityDates) {
            for (int i = 0; i < randomDate.length; i++) {
                if (Math.random() > 0.5) {
                    randomDate[i] = false;
                }
                else {
                    randomDate[i] = true;
                }
            }
        }
        System.out.println("Canvassers Available: " + numCanvassers + " # Dates Consecutive: " + numConsecutiveDates);
        System.out.println("Canvasser Availability Dates:");
        for (int i = 0; i < canvasserAvailabilityDates.length; i++) {
            System.out.print("Canvasser " + i + " Avail Dates: ");
            for (boolean dateBool : canvasserAvailabilityDates[i]) {
                if (dateBool) {
                    System.out.print("Avail ");
                }
                else {
                    System.out.print("Unavail ");
                }
            }
            System.out.println();
        }
        boolean[][] updatedAvailDates = checkAndAssignCanvassers(canvasserAvailabilityDates, bestSol.size());
        
        if (updatedAvailDates == null) {
            System.out.println("Not enough canvasser available dates");
        }
        else {
            for (int i = 0; i < updatedAvailDates.length; i++) {
                System.out.print("Canvasser " + i + " Changed Schedule: ");
                for (int j = 0; j < updatedAvailDates[0].length; j++) {
                    if (updatedAvailDates[i][j] == canvasserAvailabilityDates[i][j]) {
                        if (updatedAvailDates[i][j]) {
                            System.out.print("Avail ");
                        }
                        else {
                            System.out.print("Unavail ");
                        }
                    }
                    else {
                        System.out.print("Booked ");
                    }
                }
                System.out.println();
            }
        }
        launch(args);
    }
    
    // Calculate the paths for canvassers by choosing the
    // first location and finding the next not chosen location
    // Returns an array of canvassers each with an array of locations
    public static ArrayList<ArrayList<Location>> calculate() {
        Location curLocation = locations[0];
        ArrayList<ArrayList<Location>> pathList = new ArrayList();
        ArrayList<Location> curList = new ArrayList();
        curList.add(curLocation);
        double curPathTime = 15;
        for (int i = 1; i < locations.length; i++) {
            if (totalTimeWillBeReached(curPathTime, i - 1, i)) {
                pathList.add(curList);
                bestSol.add(curList);
                curList = new ArrayList();
                curPathTime = 15;
            }
            curList.add(locations[i]);
            double time = TIME_PER_VISIT + (distMatrix[i - 1][i]/CANVASSER_SPEED);
            curPathTime += time;
            totalDistance += time;
        }
        pathList.add(curList);
        bestSol.add(curList);
        return pathList;
    }
    
    // Helper function for optimize, uses the local neighborhood search
    static void optimizeHelper(ArrayList<ArrayList<Location>> visits) {
        double dist = totalDistance;
        int indexASwitch = -1, indexBSwitch = -1, locFromSwitch = -1, locToSwitch = -1;
        ArrayList<Location> locFrom, locTo;
        int locIndexFrom, locIndexTo;
        double lowestNeighborDist, neighborDist;
        
        // Iterates until there are no more better options
        while (true) {
            lowestNeighborDist = Double.MAX_VALUE;
            for (locIndexFrom = 0; locIndexFrom < visits.size(); locIndexFrom++) {
                locFrom = visits.get(locIndexFrom);
                for (int j = 0; j < locFrom.size(); j++) {
                    for (locIndexTo =0; locIndexTo < visits.size(); locIndexTo++) {
                        locTo = visits.get(locIndexTo); 
                        for(int k = -1; k < locTo.size(); k++) {
                            
                            // Check if the route will change and change it if the total change is net negative distance
                            if (((locIndexTo == locIndexFrom) && ((k == j) || (k == j - 1))) == false) {
                                double subtractDist1, subtractDist2, subtractDist3, addDist1, addDist2, addDist3;
                                
                                if (j == 0) {
                                    subtractDist1 = 0;
                                }
                                else {
                                    subtractDist1 = distMatrix[locFrom.get(j - 1).id][locFrom.get(j).id];
                                }
                                
                                if (j == locFrom.size() - 1) {
                                    subtractDist2 = 0;
                                }
                                else {
                                    subtractDist2 = distMatrix[locFrom.get(j).id][locFrom.get(j+1).id];
                                }
                                
                                if (k == locTo.size() - 1 || k == -1) {
                                    subtractDist3 = 0;
                                }
                                else {
                                    subtractDist3 = distMatrix[locTo.get(k).id][locTo.get(k+1).id];
                                }
                                
                                if (j == 0 || j == locFrom.size() - 1) {
                                    addDist1 = 0;
                                }
                                else {
                                    addDist1 = distMatrix[locFrom.get(j-1).id][locFrom.get(j+1).id];
                                }
                                if (k == -1) {
                                    addDist2 = 0;
                                }
                                else {
                                    addDist2 = distMatrix[locTo.get(k).id][locFrom.get(j).id];
                                }
                                if (k == locTo.size() - 1) {
                                    addDist3 = 0;
                                }
                                else {
                                    addDist3 = distMatrix[locFrom.get(j).id][locTo.get(k + 1).id];
                                }
                                
                                if (totalDistOfCanvasser(visits.get(locIndexTo))+ TIME_PER_VISIT + (addDist1 + addDist2 + addDist3)/CANVASSER_SPEED <= CANVASSER_WORKDAY) {
                                    neighborDist = (addDist1 + addDist2 + addDist3 - subtractDist1 - subtractDist2 - subtractDist3);
                                    if (neighborDist < lowestNeighborDist) {
                                        lowestNeighborDist = neighborDist;
                                        indexASwitch = j;
                                        indexBSwitch = k;
                                        locFromSwitch = locIndexFrom;
                                        locToSwitch = locIndexTo;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (lowestNeighborDist >= 0) {
                break;
            }
            locFrom = visits.get(locFromSwitch);
            locTo = visits.get(locToSwitch);
            
            Location tempLoc = locFrom.get(indexASwitch);

            locFrom.remove(indexASwitch);
            
            if (locFromSwitch == locToSwitch) {
                if (indexASwitch < indexBSwitch) {
                    locTo.add(indexBSwitch, tempLoc);
                }
                else {
                    locTo.add(indexBSwitch + 1, tempLoc);
                }
            }
            else {
                locTo.add(indexBSwitch + 1, tempLoc);
            }
            
            visits.set(locFromSwitch, locFrom);
            visits.set(locToSwitch, locTo);
            
            dist += lowestNeighborDist/CANVASSER_SPEED;
            if (dist < totalDistance) {
                totalDistance = dist;
            }
            else if (dist == totalDistance) {
                break;
            }
        }
    }
    
    // Optimizes the simple solution using localized neighborhood search
    // Repeats the optimization when # of canvassers could be reduced
    static void optimize(ArrayList<ArrayList<Location>> visits) {
        optimizeHelper(visits);
        
        // Checks if the # of canvassers could be reduced
        // If yes, reduce and repeat search    
        combineCanvassers(visits);
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

    // Checks if the CANVASSER_WORKDAY will be exceeded by adding a location
    static boolean totalTimeWillBeReached(double curtime, int curIndex, int closestIndex) {
        return curtime + TIME_PER_VISIT + (distMatrix[curIndex][closestIndex]/CANVASSER_SPEED) > CANVASSER_WORKDAY;
    }
    
    // Combines canvassers if the lowest 2 distances can be combined to one
    static void combineCanvassers(ArrayList<ArrayList<Location>> visits) {
        while (true) {
            double shortestDist = Double.MAX_VALUE;
            int visitsInd1 = -1;
            int visitsInd2 = -1;
            int mode = -1;
            for (int i = 0; i < visits.size(); i++) {
                for (int j = i + 1; j < visits.size(); j++) {
                    double combinedDist = totalDistOfCanvasser(visits.get(i)) + totalDistOfCanvasser(visits.get(j)) + manhattanDistance(visits.get(i).get(0), visits.get(j).get(0))/CANVASSER_SPEED;
                    if (combinedDist < shortestDist) {
                        shortestDist = combinedDist;
                        visitsInd1 = i;
                        visitsInd2 = j;
                        mode = 0;
                    }
                    
                    combinedDist = totalDistOfCanvasser(visits.get(i)) + totalDistOfCanvasser(visits.get(j)) + manhattanDistance(visits.get(i).get(visits.get(i).size() - 1), visits.get(j).get(0))/CANVASSER_SPEED;
                    if (combinedDist < shortestDist) {
                        shortestDist = combinedDist;
                        visitsInd1 = i;
                        visitsInd2 = j;
                        mode = 1;
                    }
                    
                    combinedDist = totalDistOfCanvasser(visits.get(i)) + totalDistOfCanvasser(visits.get(j)) + manhattanDistance(visits.get(i).get(0), visits.get(j).get(visits.get(j).size() - 1))/CANVASSER_SPEED;
                    if (combinedDist < shortestDist) {
                        shortestDist = combinedDist;
                        visitsInd1 = i;
                        visitsInd2 = j;
                        mode = 2;
                    }
                    
                    combinedDist = totalDistOfCanvasser(visits.get(i)) + totalDistOfCanvasser(visits.get(j)) + manhattanDistance(visits.get(i).get(visits.get(i).size() - 1), visits.get(j).get(visits.get(j).size() - 1))/CANVASSER_SPEED;
                    if (combinedDist < shortestDist) {
                        shortestDist = combinedDist;
                        visitsInd1 = i;
                        visitsInd2 = j;
                        mode = 3;
                    }
                }
            }
            
            ArrayList<ArrayList<Location>> tempVisits = new ArrayList();
            for (int i = 0; i < visits.size(); i++) {
                ArrayList tempArr = new ArrayList();
                for (int j = 0; j < visits.get(i).size(); j++) {
                    Location tempLoc = new Location(visits.get(i).get(j).x, visits.get(i).get(j).y, visits.get(i).get(j).id);
                    tempArr.add(tempLoc);
                }
                tempVisits.add(tempArr);
            }
            
            if (mode == 0) {
                ArrayList<Location> newPath = new ArrayList();
                for (int i = tempVisits.get(visitsInd1).size() - 1; i >= 0; i--) {
                    newPath.add(tempVisits.get(visitsInd1).get(i));
                }
                for (int i = 0; i < tempVisits.get(visitsInd2).size(); i++) {
                    newPath.add(tempVisits.get(visitsInd2).get(i));
                }
                if (visitsInd1 > visitsInd2) {
                    tempVisits.remove(visitsInd1);
                    tempVisits.remove(visitsInd2);
                }
                else {
                    tempVisits.remove(visitsInd2);
                    tempVisits.remove(visitsInd1);
                }
                tempVisits.add(newPath);
            }

            if (mode == 1) {
                for (int i = 0; i < tempVisits.get(visitsInd2).size(); i++) {
                    tempVisits.get(visitsInd1).add(tempVisits.get(visitsInd2).get(i));
                }
                tempVisits.remove(visitsInd2);
            }

            if (mode == 2) {
                for (int i = 0; i < tempVisits.get(visitsInd1).size(); i++) {
                    tempVisits.get(visitsInd2).add(tempVisits.get(visitsInd1).get(i));
                }
                tempVisits.remove(visitsInd1);

            }

            if (mode == 3) {
                for (int i = tempVisits.get(visitsInd2).size() - 1; i >= 0; i--) {
                    tempVisits.get(visitsInd1).add(tempVisits.get(visitsInd2).get(i));
                }
                tempVisits.remove(visitsInd2); 
            }
            
            optimizeHelper(tempVisits);
            
            if (canvasserIsValid(tempVisits)) {
                visits = tempVisits;
                bestSol = tempVisits;
                System.out.println("Optimized distance: " + totalDistance + " # of Canvassers " + visits.size());
                for (int i = 0; i < visits.size(); i++) {
                    System.out.print("Canvasser " + i+ ": ");
                    System.out.println(totalDistOfCanvasser(visits.get(i)));
                }
            }
            else {
                break;
            }
        }
        
    }
    
    // Calculates the distance a canvasser will travel
    static double totalDistOfCanvasser(ArrayList<Location> canvasser){
        double tempDist = 0;
        for (int j = 1; j < canvasser.size(); j++) {
            tempDist += manhattanDistance(canvasser.get(j), canvasser.get(j - 1));
        }
        return (tempDist/CANVASSER_SPEED) + (TIME_PER_VISIT * canvasser.size());
    }
    
    // Checks if there is a canvasser of time longer than CANVASSER_WORKDAY
    static boolean canvasserIsValid(ArrayList<ArrayList<Location>> canvassers) {
        for (ArrayList canvasser : canvassers) {
            if (totalDistOfCanvasser(canvasser) > CANVASSER_WORKDAY) {
                return false;
            }
        }
        return true;
    }
    
    // Gets the smallest and second smallest distance indexes
    static int[] getSmallestAndSmallerInd (ArrayList<ArrayList<Location>> visits) {
        int[] indexes = new int[2];
        int smallestInd, smallerInd;
        if (totalDistOfCanvasser(visits.get(0)) > totalDistOfCanvasser(visits.get(1))) {
            smallerInd = 0;
            smallestInd = 1;
        }
        else {
            smallerInd = 1;
            smallestInd = 0;
        }
        for (int i = 2; i < visits.size(); i++) {
            if (totalDistOfCanvasser(visits.get(i)) < totalDistOfCanvasser(visits.get(smallerInd))) {
                if (totalDistOfCanvasser(visits.get(i)) < totalDistOfCanvasser(visits.get(smallestInd))) {
                    smallerInd = smallestInd;
                    smallestInd = i;
                }
                else if (totalDistOfCanvasser(visits.get(i)) > totalDistOfCanvasser(visits.get(smallestInd))) {
                    smallerInd = i;
                }
            }
        }
        indexes[0] = smallestInd;
        indexes[1] = smallerInd;
        return indexes;
    }
    
    static boolean[][] checkAndAssignCanvassers(boolean[][] availDates, int slots) {
        int curSlots = 0;
        for (boolean[] canvDates : availDates) {
            for (boolean date : canvDates) {
                if (date) {
                    curSlots++;
                }
            }
        }
        
        if (curSlots < slots) {
            return null;
        }
        else {
            boolean[][] bookedDates = new boolean[availDates.length][availDates[0].length];
            for (int i = 0; i < bookedDates.length; i++) {
                for (int j = 0; j < bookedDates[0].length; j++) {
                    bookedDates[i][j] = availDates[i][j];
                }
            }
            for (boolean[] canvDates : bookedDates) {
                for (int i = 0; i < canvDates.length; i++) {
                    if (canvDates[i]) {
                        canvDates[i] = false;
                        slots--;
                        if (slots == 0) {
                            return bookedDates;
                        }
                    }
                }
            }
            return null;
        }
    }
}
