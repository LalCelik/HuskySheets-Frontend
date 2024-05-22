package com.valid.husksheets.model;

import java.util.ArrayList;
import java.util.List;

public class UserSystem {
    private List<User> users;

    public UserSystem() {
        this.users = new ArrayList<>();
    }

    public User findByUsername(String username) {
        for (User u : users) {
            if (username.equals(u.getUsername())) {
                return u;
            }
        }
        return null;
    }
}
