package team830.SuperCanvasser.User;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class Variable {
    private ObjectId id;
    private String type;
    private String value;
}
