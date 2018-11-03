package team830.SuperCanvasser;

import team830.SuperCanvasser.Campaign.Campaign;
import team830.SuperCanvasser.User.Role;
import team830.SuperCanvasser.User.User;
import team830.SuperCanvasser.Variable.Variable;

public class CurrentObject {

    private static User currentUser;
    private static Campaign currentCamp;
    private static Variable currentVar;

    public static Role getCurrentRole() {
        return currentRole;
    }

    public static void setCurrentRole(Role currentRole) {
        CurrentObject.currentRole = currentRole;
    }

    private static Role currentRole;

    public static User getCurrentUser() {
        return currentUser;
    }

    public static void setCurrentUser(User currentUser) {
        CurrentObject.currentUser = currentUser;
    }

    public static Campaign getCurrentCamp() {
        return currentCamp;
    }

    public static void setCurrentCamp(Campaign currentCamp) {
        CurrentObject.currentCamp = currentCamp;
    }

    public static Variable getCurrentVar() {
        return currentVar;
    }

    public static void setCurrentVar(Variable currentVar) {
        CurrentObject.currentVar = currentVar;
    }
}
