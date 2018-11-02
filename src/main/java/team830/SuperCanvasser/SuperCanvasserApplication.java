package team830.SuperCanvasser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SuperCanvasserApplication{
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);


    public static void main(String[] args)
    {
        SpringApplication.run(SuperCanvasserApplication.class, args);
        log.info("Program Started");
    }
}

