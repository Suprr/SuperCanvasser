package team830.SuperCanvasser.Task;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Questionnaire {
    @Id
    private String _id;
    @DBRef
    private HashMap<String, Boolean> qNa;
    private boolean anon;
    private int rating;
    private String notes;

    public Questionnaire(List<String> questions) {
        qNa = new HashMap<String, Boolean>();
        for (final String string : questions) {
            qNa.put(string, null);
        }
    }

    public Questionnaire() {
    }

    public Questionnaire addQuestion(String question) {
        this.qNa.put(question, null);
        return this;
    }

}
