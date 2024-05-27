package com.valid.husksheets.model;

import java.util.ArrayList;
import java.util.List;

/**
 * System that holds a list of Users. If the system is preset with a list of Users, assume all
 * Users are unique.
 */
public class UserSystem {
    private List<User> users;

    public UserSystem() {
        this.users = new ArrayList<>();
    }

    public UserSystem(List<User> users) {
        this.users = users;
    }

    /**
     * Finds the User by the given username from the User System
     * @param username, which is a String that we want to find
     * @return User
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
     * Adds a User to the system
     */
    protected void addUser(User user) {
        for (User value : this.users) {
            if (value.equals(user)) {
                throw new IllegalArgumentException("User already exists in the system. Create a different" +
                        "username");
            }
        }
        this.users.add(user);
    }
}
