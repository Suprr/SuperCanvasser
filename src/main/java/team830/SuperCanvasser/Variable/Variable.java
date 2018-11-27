package team830.SuperCanvasser.Variable;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.NonNull;

@Data
@Document(collection = "variables")
public class Variable{
    @Id
    private String _id;
    @NonNull
    private String type;
    @NonNull
    private String value;

    public Variable(){}
    public Variable (String type, String value){
        this.type = type;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(@NonNull String value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(@NonNull String type) {
        this.type = type;
    }



}
