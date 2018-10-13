package team830.SuperCanvasser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableRepo;

@SpringBootApplication
public class SuperCanvasserApplication{


    public static void main(String[] args)
    {
        SpringApplication.run(SuperCanvasserApplication.class, args);
    }
}

