package team830.SuperCanvasser.Result;

import com.google.common.math.Stats;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Campaign.Campaign;
import team830.SuperCanvasser.Location.Location;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "results")
@Data
public class Result {
    @Id
    private String _id;
    private String campaignId;
    private double sdRating;
    private double avgRating;
    private Map<String, Integer> qNaCount = new HashMap<>(); // List<Integer>
    private List<Double> ratings;

    Result(String _id, Campaign campaign, List<Double> ratings){
        this._id = _id;
        this.campaignId = campaign.get_id();
        this.ratings = ratings;
        setqNaCount(campaign.getQuestions());
        countYesQnA(campaign.getQuestions(), campaign.getLocations());
        calculateAvg(ratings);
        calculateStd(ratings);
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public double getSdRating() {
        return sdRating;
    }

    public void setSdRating(double sdRating) {
        this.sdRating = sdRating;
    }

    public double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    public Map<String, Integer> getqNaCount() {
        return qNaCount;
    }

    public void setqNaCount(List<String> questions) {
        for(String q : questions){
            qNaCount.put(q, 0);
        }
    }

    public List<Double> getRatings() {
        return ratings;
    }

    public void setRatings(List<Double> ratings) {
        this.ratings = ratings;
    }

    // calculate standard deviation rating
    public double calculateStd(List<Double> ratings){
        this.sdRating = Stats.of(ratings).populationStandardDeviation();
        return this.sdRating;
    }

    // calculate average rating
    public double calculateAvg(List<Double>ratings){
        this.avgRating = Stats.of(ratings).mean();
        return this.avgRating;
    }
    // count yes for each questions in all locations
    public void countYesQnA(List<String> questions, List<Location> locationList){
        for(Location location: locationList){
            if(location.isVisited()) {
                Map<String, Boolean> qNa = location.getqNa();
                for (String q : questions) {
                    if (qNa.get(q)) {
                        int oldVal = qNaCount.get(q);
                        qNaCount.replace(q, oldVal + 1);
                    }
                }
            }
        }
    }
}
