package com.valid.husksheets;

import com.valid.husksheets.model.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.valid.husksheets.model.UserSystem;

public class UserSystemTests {

    @Test
    void registerTest() {
        UserSystem userSystem = new UserSystem("src/main/java/com/valid/husksheets/db/systemTest.json");
        userSystem.loadDB(); // Load initial users
        
        // Register a new user
        String username = userSystem.getUsers().get(0).getUsername();
        userSystem.register(username);

        // Registered successfully
        User registeredUser = userSystem.findByUsername(username);
        assertNotNull(registeredUser);
        assertTrue(registeredUser.getPublisher());
        
        // Reset the user system
        userSystem.updateDB();
    }
}
