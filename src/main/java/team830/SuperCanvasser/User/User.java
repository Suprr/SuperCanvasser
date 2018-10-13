package team830.SuperCanvasser.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotEmpty;
import java.util.Collection;

@Builder
@Document(collection = "users")
public class User implements UserDetails {
    @Id
    private ObjectId id;

    @NotEmpty(message = "Please type first name")
    private String firstName;

    @NotEmpty(message = "Please type last name")
    private String lastName;
    private String zipCode;
    @NotEmpty(message = "Please type email")
    private String email;
    private String pwdHash;

    @NotEmpty(message = "Please select role(s)")
    @DBRef
    private Role[] roles;

    @Override
    public String getPassword() {
        return pwdHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

}