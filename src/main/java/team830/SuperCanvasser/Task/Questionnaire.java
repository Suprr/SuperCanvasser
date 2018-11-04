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
    private boolean anonymous;
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

    public HashMap<String, Boolean> getqNa() {
        return qNa;
    }

    public void setqNa(HashMap<String, Boolean> qNa) {
        this.qNa = qNa;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public boolean isAnonymous() {
        return anonymous;
    }

    public void setAonymous(boolean anonymous) {
        this.anonymous = anonymous;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
