package team830.SuperCanvasser.LogIn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import team830.SuperCanvasser.User.UserService;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class LogInConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
//                    .antMatchers("/login").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .formLogin()
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .successForwardUrl("/selectRole")
                    .failureUrl("/loginFail")
                    .and()

                .logout()
                    .permitAll()
                    .invalidateHttpSession(true)
                    .logoutSuccessUrl("/logout")
                .and().csrf().disable();

    }
    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.authenticationProvider(userService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                // "/admin/**", "/canvasser/**", "/manager/**",
                .antMatchers( "/css/**", "/js/**", "/images/**");
    }

    @Bean
    public UserService AuthenticationProviderBean() throws Exception {
        return new UserService();
    }

}