package team830.SuperCanvasser.LogIn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import team830.SuperCanvasser.User.UserRepo;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class LogInConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserRepo userRepo;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/login").permitAll()

                    .and()
                .formLogin()
                    .loginPage("/login")
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .defaultSuccessUrl("/selectRole")
                    .failureUrl("/loginFail")
                    .and()
                .logout()
                    .permitAll()
                    .invalidateHttpSession(true)
                    .logoutSuccessUrl("/logout");

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/admin/**", "/canvasser/**", "/manager/**", "/css/**", "/js/**", "/images/**");
    }

}