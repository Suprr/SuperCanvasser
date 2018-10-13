package team830.SuperCanvasser.User;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public abstract class User {
    @Id
    public String id;
    public String passHash;
    public String firstName;
    public String lastName;
    public String zipCode;
    public String email;
    public String[] role;

}
