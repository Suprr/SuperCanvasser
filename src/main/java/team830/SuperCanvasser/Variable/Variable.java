package team830.SuperCanvasser.Variable;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "variable")
public class Variable{
    @Id
    private String _id;

    private String type;
    private String value;

    public Variable(){}
    public Variable (String type, String value){
        this.type = type;
        this.value = value;
    }
}
