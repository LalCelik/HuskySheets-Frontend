package com.valid.husksheets.model;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.valid.husksheets.JSON.Argument;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * System that holds a list of Users. If the system is preset with a list of Users, assume all
 * Users are unique.
 * Owner: Sunkwan
 */
@Service
public class UserSystem {
    private List<User> users = new ArrayList<>();

    /**
     * Instantiates an UserSystem object by loading the database from local persistent storage.
     */
    public UserSystem() {
        this.loadDB();
    }

    /**
     * Instantiates an UserSystem with given List of Users
     * @param users List of Users that we want to input
     */
    public UserSystem(List<User> users) {
        this.users = users;
    }

    /**
     * Get all the users in the UserSystem
     * @return List of Users
     */
    public List<User> getUsers() {
        return users;
    }

    /**
     * Load from the DB json to this UserSystem
     */
    public void loadDB() {
        String jsonString;
        try {
            jsonString = Files.readString(Path.of("src/main/java/com/valid/husksheets/db/system.json"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        this.users = new Gson().fromJson(jsonString, new TypeToken<ArrayList<User>>(){}.getType());
        System.out.println("UserSystem DB loaded");
    }

    /**
     * Update the given Json DB from this current UserSystem
     */
    public void updateDB() {
        try (Writer writer = new FileWriter("src/main/java/com/valid/husksheets/db/system.json")) {
            Gson gson = new GsonBuilder().create();
            gson.toJson(users, writer);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("UserSystem DB updated");
    }

    /**
     * Finds the User by the given username from the User System
     * @param username, which is a String that we want to find
     * @return User that we are looking for, null if none found
     */
    public User findByUsername(String username) {
        for (User u : this.users) {
            if (username.equals(u.getUsername())) {
                return u;
            }
        }
        return null;
    }

    /**
     * Get all users in the System
     * @return List of Argument where each User's name is in it.
     */
    public List<Argument> getPublishers() {
        List<Argument> result = new ArrayList<>();
        for (User u : this.users) {
            if (u.getPublisher()) {
                result.add(new Argument(u.getUsername(), null, null, null));
            }
        }
        return result;
    }

    /**
     * Adds user to the System
     * @param user that needs to be added
     */
    public void addUser(User user) {
        for (User value : this.users) {
            if (value.equals(user)) {
                throw new IllegalArgumentException("User already exists in the system" +
                        "username");
            }
        }
        this.users.add(user);
        this.updateDB();
    }

    /**
     * Delete user to the System
     * @param user that needs to be added
     */
    public void deleteUser(User user) {
        for (User value : this.users) {
            if (value.equals(user)) {
                this.users.remove(user);
                this.updateDB();
                break;
            }
        }
    }

    /**
     * Register a user to the system
     * @param username username to register
     */
    public void register(String username) {
        for (User u : this.users) {
            if (u.getUsername().equals(username)) {
                u.setPublisher();
            }
        }
        this.updateDB();
    }
}
