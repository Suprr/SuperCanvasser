package team830.SuperCanvasser.Canvasser;

import lombok.Data;

import java.util.List;
@Data
public class ArrayStringWrapper {
    List<String> strings;


    public List<String> getStrings() {
        return strings;
    }

    public void setStrings(List<String> strings) {
        this.strings = strings;
    }

}
