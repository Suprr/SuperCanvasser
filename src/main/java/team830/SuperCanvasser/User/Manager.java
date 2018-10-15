package team830.SuperCanvasser.User;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import team830.SuperCanvasser.Campaign.Campaign;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

//@Data
@Document(collection = "User")
public class Manager extends User {
    @DBRef
    private List<Campaign> campaigns;

    public Manager(List<Campaign> campaignList) {
        this.campaigns = new ArrayList<Campaign>(campaignList);
    }

    public Manager() {
        this.campaigns = new ArrayList<Campaign>();
    }

}
