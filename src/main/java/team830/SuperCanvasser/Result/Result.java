package team830.SuperCanvasser.Result;

import com.google.common.math.Stats;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Campaign.Campaign;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "results")
@Data
public class Result {
    @Id
    private String _id;
    private String campaignId;
    private double sdRating;
    private double avgRating;
    private Map<String, Double> qNaPercentage = new HashMap<>();

    Result(String _id, Campaign campaign, double [] ratings){
        this.campaignId = campaign.get_id();
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

    public Map<String, Double> getqNaPercentage() {
        return qNaPercentage;
    }

    public void setqNaPercentage(Map<String, Double> qNaPercentage) {
        this.qNaPercentage = qNaPercentage;
    }

    // calculate standard deviation of rating
    public double calculateStd(double [] ratings){
        this.sdRating = Stats.of(ratings).sampleStandardDeviation();
        return this.sdRating;
    }

    // calculate averate of raiting
    public double calculateAvg(double [] ratings){
        this.avgRating = Stats.of(ratings).mean();
        return this.avgRating;
    }

}
