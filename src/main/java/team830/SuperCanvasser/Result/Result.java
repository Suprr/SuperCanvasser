package team830.SuperCanvasser.Result;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Document(collection = "results")
@Data
public class Result {
    @Id
    String _id;
    String campaignId;
    double sd;
    double avg;
    Map<String, Double> qNaPercentage = new HashMap<>();


}
