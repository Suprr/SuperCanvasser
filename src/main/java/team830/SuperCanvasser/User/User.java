package team830.SuperCanvasser.User;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String email;
    private String pwd;
    private String firstName;
    private String lastName;
    private String zipcode;
    private String[] role;

    public User(){}

    public User(String id, String email, String pwd, String firstName, String lastName, String zipcode, String[] role) {
        this.id = id;
        this.email = email;
        this.pwd = pwd;
        this.firstName = firstName;
        this.lastName = lastName;
        this.zipcode = zipcode;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }
}
