package com.valid.husksheets;

import com.valid.husksheets.JSON.Argument;
import com.valid.husksheets.model.User;
import com.valid.husksheets.model.UserSystem;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class UserSystemTest {
    private User user1;
    private User user2;
    private User user3;
    private UserSystem userSystem;

    @BeforeEach
    void setup() {
        user1 = new User("user1", "user1", new ArrayList<>());
        user2 = new User("user2", "user2", new ArrayList<>());
        user3 = new User("user3", "user3", new ArrayList<>());
        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);
        users.add(user3);
        userSystem = new UserSystem(users, "src/main/java/com/valid/husksheets/db/systemTestEmpty.json");
    }
    @Test
    void findByUsernameTest() {
        assertThat(userSystem.findByUsername("user1"))
                .isEqualTo(user1);
    }

    @Test
    void getPublishersTest() {
        List<Argument> arguments = new ArrayList<>();
        arguments.add(new Argument("user1", null, null, null));
        arguments.add(new Argument("user2", null, null, null));
        arguments.add(new Argument("user3", null, null, null));
        assertThat(userSystem.getPublishers())
                .isEqualTo(arguments);
    }


    @Test
    void addUserTest() {
        User user4 = new User("user4", "user4", new ArrayList<>());
        userSystem.addUser(user4);

        List<Argument> arguments = new ArrayList<>();
        arguments.add(new Argument("user1", null, null, null));
        arguments.add(new Argument("user2", null, null, null));
        arguments.add(new Argument("user3", null, null, null));
        arguments.add(new Argument("user4", null, null, null));

        assertThat(userSystem.getPublishers())
                .isEqualTo(arguments);
    }

    @AfterEach
    void clean() {
        userSystem.deleteUser(user1);
        userSystem.deleteUser(user2);
        userSystem.deleteUser(user3);
    }
}