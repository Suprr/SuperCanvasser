package team830.SuperCanvasser.Variable;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "variable")
@Data
public class Variable{
    @Id
    private ObjectId id;

    private String type;
    private String value;

    public Variable (String type, String value){
        this.type = type;
        this.value = value;
    }
}
