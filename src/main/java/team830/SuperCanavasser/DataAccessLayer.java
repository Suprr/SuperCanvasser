package team830.SuperCanavasser;

public class DataAccessLayer {
    public interface UserRepository extends JpaRepository<User, Long> {

        User findByUsername(String username);
    }
}
