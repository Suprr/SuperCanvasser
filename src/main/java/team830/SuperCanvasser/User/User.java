package team830.SuperCanvasser.User;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public abstract class User {
    @Id
    private ObjectId id;
    private String passHash;
    private String firstName;
    private String lastName;
    private String zipCode;
    private String email;
    private String[] role;

}