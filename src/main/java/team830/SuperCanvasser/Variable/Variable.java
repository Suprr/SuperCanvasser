package team830.SuperCanvasser.Variable;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document(collection = "variables")
public class Variable{
    @Id
    private String _id;

    @Indexed(unique = true)
    @NonNull
    private String type;
    @NonNull
    private String value;

    public Variable (String type, String value){
        this.type = type;
        this.value = value;
    }
}
