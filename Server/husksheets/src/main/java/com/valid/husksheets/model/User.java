package com.valid.husksheets.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private int id;
    private String username;
    private String password;
    private List<Integer> sheets = new ArrayList<>();

    public User(int id, String username, String password, List<Integer> sheets) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.sheets = sheets;
    }

    /**
     * Are two Users the same?
     * @param user User being compared to
     * @return true if the usernames are the same, else return false
     */

    //@Override
    public boolean equals(User user) {
        return this.username.equals(user.username);
    }

    /**
     * Creates a unique hashcode for this User based on the User's username
     * and password
     * @return hashcode
     */

    //comment this out?
    // @Override
    public int hashCode() {
        int hash = this.username.hashCode();
        hash += this.password.hashCode();

        return hash;
    }

    /**
     * Returns the User's username
     * @return User's username
     */
    public String getUsername() {
        return this.username;
    }


    /**
     * Returns the User's password
     * @return User's password
     */
    public String getPassword() {
        return this.password;
    }
}