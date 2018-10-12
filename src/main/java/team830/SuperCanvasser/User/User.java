package team830.SuperCanvasser.User;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotEmpty;
import java.util.Collection;

@Document(collection = "users")
public class User{
    @Id
    private ObjectId id;

    @NotEmpty(message = "Please type first name")
    private String firstName;

    @NotEmpty(message = "Please type last name")
    private String lastName;
    private String zipCode;
    @NotEmpty(message = "Please type email")
    private static String email;
    private String pwdHash;

    @NotEmpty(message = "Please select role(s)")
    private Role[] roles;

    public User(String username, String password, Role[] roles) {
        this.setEmail(username);
        this.setPwdHash(password);
        this.setRoles(roles);
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public static String getEmail() {
        return email;
    }

    public static void setEmail(String email) {
        User.email = email;
    }

    public String getPwdHash() {
        return pwdHash;
    }

    public void setPwdHash(String pwdHash) {
        this.pwdHash = pwdHash;
    }

    public Role[] getRoles() {
        return roles;
    }

    public void setRoles(Role[] roles) {
        this.roles = roles;
    }
}