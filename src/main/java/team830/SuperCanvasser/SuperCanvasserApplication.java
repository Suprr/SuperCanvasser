package team830.SuperCanvasser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableRepo;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SuperCanvasserApplication{


    public static void main(String[] args)
    {
        SpringApplication.run(SuperCanvasserApplication.class, args);
    }
}

