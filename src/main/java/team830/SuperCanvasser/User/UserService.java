package team830.SuperCanvasser.User;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import team830.SuperCanvasser.Repo.UserRepo;

import java.util.HashSet;
import java.util.Set;


public class UserService implements UserDetailsService, AuthenticationProvider {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*Here add user data layer fetching from the MongoDB.
          I have used userRepository*/
        User user = userRepo.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException(username);

        }else{
            UserDetails details = new CustomUserDetails(user);

            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            for (Role role : user.getRoles()){
                grantedAuthorities.add(new SimpleGrantedAuthority(role.toString()));
            }
            return details;
        }
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        Object cred = authentication.getCredentials();
        if (!(cred instanceof String)) {
            return null;
        }
        String pwd = cred.toString();
        Authentication auth = new UsernamePasswordAuthenticationToken(email, pwd);
        return auth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team830.SuperCanvasser.SuperCanvasserApplication;


@Service
public class UserService implements UserInterface{
    @Autowired
    private UserRepo userRepo;
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    public User editUser(User user) {
        log.debug("Edit User - Service");
        return userRepo.save(user);
    }

    @Override
    public User addUser(User user) {
        log.debug("Add User - Service");
        return userRepo.insert(user);
    }

    @Override
    public User getUserByEmail(String email) {
        log.debug("Get User - Service");
        return userRepo.findByEmail(email);
    }
}
>>>>>>> wongeun
