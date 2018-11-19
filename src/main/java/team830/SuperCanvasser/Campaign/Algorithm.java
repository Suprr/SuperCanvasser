package team830.SuperCanvasser.Campaign;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import team830.SuperCanvasser.Canvasser.AvailabilityService;
import team830.SuperCanvasser.Location.Location;
import team830.SuperCanvasser.Task.Task;
import team830.SuperCanvasser.Task.TaskService;

/**
 *
 * @author Chris
 */
public class Algorithm {
    @Autowired
    static TaskService taskService;
    static CampaignService campaignService;
    static AvailabilityService availabilityService;
    // Walking speed in respect to Latitude and Longitude is 0.05/69
    // degrees of Latitude/Longitude a minute
    private static final double CANVASSER_SPEED = (0.05/69);
    private static final int CANVASSER_WORKDAY = 480;
    private static final int TIME_PER_VISIT = 15;
    
    private static double[][] distMatrix;
    private static double totalDistance = 0;
    
    private static ArrayList<ArrayList<Location>> bestSol = new ArrayList();
    private static List<Task> tasks = new ArrayList();
    private static List<String> taskIDs = new ArrayList();

    public static List<String> start(Campaign campaign){
        for (int i = 0; i < campaign.getLocations().size(); i++) {
            campaign.getLocations().get(i).setIndex(i);
        }
        makeDistanceMatrix(campaign.getLocations());
        ArrayList<ArrayList<Location>> canvasserVisits = calculate(campaign.getLocations());
        optimize(canvasserVisits);

        for (int i = 0; i < bestSol.size(); i++) {
            List<String> locations = new ArrayList();
            for (int j = 0; j < bestSol.get(i).size(); j++) {
                locations.add(bestSol.get(i).get(j).get_id());
            }
            Task newTask = new Task(locations, locations.get(0));
            newTask.set_id(ObjectId.get().toHexString());
            taskIDs.add(newTask.get_id());
            taskService.addTask(newTask);
            tasks.add(newTask);
        }

        int totalCanvasserDates = 0;
        for (int i = 0; i < campaign.getCanvassers().size(); i++) {
            totalCanvasserDates += campaignService.listAvailableDates(campaign.getStartDate(), campaign.getEndDate(), availabilityService.findByCanvasserId(campaign.getCanvassers().get(i))).size();
        }

        if (totalCanvasserDates < tasks.size()) {
            //error
        }

        else {
            int canvasserIndex = 0;
            while (totalCanvasserDates > 0) {
                if (campaignService.listAvailableDates(campaign.getStartDate(),campaign.getEndDate(),availabilityService.findByCanvasserId(campaign.getCanvassers().get(canvasserIndex))).size() > 0) {
                    totalCanvasserDates--;
                    tasks.get(totalCanvasserDates).setCanvasserId(campaign.getCanvassers().get(canvasserIndex));
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    String format = formatter.format(campaignService.listAvailableDates(campaign.getStartDate(),campaign.getEndDate(),availabilityService.findByCanvasserId(campaign.getCanvassers().get(canvasserIndex))).get(0));
                    availabilityService.findByCanvasserId(campaign.getCanvassers().get(canvasserIndex)).getAvailabilityDates().add(format);
                }
                else {
                    canvasserIndex++;
                }
            }
        }
        return taskIDs;
    }

    public static ArrayList<Location> recList(ArrayList<Location> locations) {
        ArrayList<Location> recommendedLocations = new ArrayList();
        recommendedLocations.add(locations.get(0));
        locations.remove(0);
        while (locations.size() > 0) {
            double dist = Double.MAX_VALUE;
            int index = 0;
            for (int i = 0; i < locations.size(); i++){
                Location loc = locations.get(i);
                if (dist > manhattanDistance(loc, recommendedLocations.get(recommendedLocations.size() - 1))) {
                    dist = manhattanDistance(loc, recommendedLocations.get(recommendedLocations.size() - 1));
                    index = i;
                }
            }
            recommendedLocations.add(locations.get(index));
            locations.remove(index);
        }
        return recommendedLocations;
    }

    List<Task> getTasks () {
        return tasks;
    }

    List<String> getTaskIDs() {
        return taskIDs;
    }
    /*
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
    }
    */
    
    // Calculate the paths for canvassers by choosing the
    // first location and finding the next not chosen location
    // Returns an array of canvassers each with an array of locations

    public static ArrayList<ArrayList<Location>> calculate(List<Location> locations) {
        Location curLocation = locations.get(0);
        ArrayList<ArrayList<Location>> pathList = new ArrayList();
        ArrayList<Location> curList = new ArrayList();
        curList.add(curLocation);
        double curPathTime = TIME_PER_VISIT;
        for (int i = 1; i < locations.size(); i++) {
            if (totalTimeWillBeReached(curPathTime, i - 1, i)) {
                pathList.add(curList);
                bestSol.add(curList);
                curList = new ArrayList();
                curPathTime = 15;
            }
            curList.add(locations.get(i));
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
                            if (!((locIndexTo == locIndexFrom) && ((k == j) || (k == j - 1)))) {
                                double subtractDist1, subtractDist2, subtractDist3, addDist1, addDist2, addDist3;
                                
                                if (j == 0) {
                                    subtractDist1 = 0;
                                }
                                else {
                                    subtractDist1 = distMatrix[locFrom.get(j - 1).getIndex()][locFrom.get(j).getIndex()];
                                }
                                
                                if (j == locFrom.size() - 1) {
                                    subtractDist2 = 0;
                                }
                                else {
                                    subtractDist2 = distMatrix[locFrom.get(j).getIndex()][locFrom.get(j+1).getIndex()];
                                }
                                
                                if (k == locTo.size() - 1 || k == -1) {
                                    subtractDist3 = 0;
                                }
                                else {
                                    subtractDist3 = distMatrix[locTo.get(k).getIndex()][locTo.get(k+1).getIndex()];
                                }
                                
                                if (j == 0 || j == locFrom.size() - 1) {
                                    addDist1 = 0;
                                }
                                else {
                                    addDist1 = distMatrix[locFrom.get(j-1).getIndex()][locFrom.get(j+1).getIndex()];
                                }
                                if (k == -1) {
                                    addDist2 = 0;
                                }
                                else {
                                    addDist2 = distMatrix[locTo.get(k).getIndex()][locFrom.get(j).getIndex()];
                                }
                                if (k == locTo.size() - 1) {
                                    addDist3 = 0;
                                }
                                else {
                                    addDist3 = distMatrix[locFrom.get(j).getIndex()][locTo.get(k + 1).getIndex()];
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
        return Math.abs(loc1.getLatitude() - loc2.getLatitude()) + Math.abs(loc1.getLongitude() - loc2.getLongitude());
    }
    
    // Creates a distance matrix used in our calculations
    static double[][] makeDistanceMatrix(List<Location> locations) {
        int numElements = locations.size();
        distMatrix = new double[numElements][numElements];
        double distance;
        
        // Matrix does not need a value when i == j, and only needs to 
        // calculate for one side of the diagonal since it is reflected
        for (int i = 0; i < numElements ; i++) {
            for (int j = i + 1; j < numElements; j++) {
                distance = manhattanDistance(locations.get(i), locations.get(j));
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
                    tempArr.add(visits.get(i).get(j));
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
}
