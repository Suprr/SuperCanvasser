package team830.SuperCanvasser;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.types.ObjectId;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import team830.SuperCanvasser.Variable.Variable;
import team830.SuperCanvasser.Variable.VariableRepo;

import java.util.LinkedHashMap;
import java.util.Map;

@RunWith(SpringRunner.class)

@DataMongoTest
public class MongoTest {

    @Autowired
    private VariableRepo repository;

    public void test (MongoTemplate mongoTemplate){

        ObjectId id = new ObjectId("5bc21f17777948b9d3000000");
        Variable variable = new Variable("avgduration", "5.5");

        repository.save(new Variable("avgduration", "5.5"));

        System.out.println("Variables found with findAll():");
        System.out.println("-------------------------------");
        for (Variable var : repository.findAll()) {
            System.out.println(var);
        }
        System.out.println();

    }
}