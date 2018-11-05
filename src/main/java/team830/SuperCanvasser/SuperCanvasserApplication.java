package team830.SuperCanvasser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class SuperCanvasserApplication extends SpringBootServletInitializer {
    private static final Logger log = LoggerFactory.getLogger(SuperCanvasserApplication.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SuperCanvasserApplication.class);
    }

    public static void main(String[] args)
    {
        SpringApplication.run(SuperCanvasserApplication.class, args);
        log.info("Program Started");
    }

}

