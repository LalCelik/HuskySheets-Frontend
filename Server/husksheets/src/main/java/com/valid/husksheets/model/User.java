package com.valid.husksheets.model;

import java.util.List;

/**
 * User or the Publisher of the husksheets
 * Owner: Victoria and Sunkwan
 */
public class User {
    private final String username;
    private final String password;
    private final List<String> sheets;
    private boolean publisher;


    /**
     * Instantiate the User object with given inputs
     * @param username username of the user
     * @param password password of the user
     * @param sheets sheets of the user
     */
    public User(String username, String password, List<String> sheets) {
        this.username = username;
        this.password = password;
        this.sheets = sheets;
        this.publisher = true;
    }

    // public User(String username, String password, List<String> sheets, boolean publisher) {
    //     this.username = username;
    //     this.password = password;
    //     this.sheets = sheets;
    //     this.publisher = publisher;
    // }

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

    /**
     * Returns the User's sheets
     * @return List of names of the sheets of the User
     */
    public List<String> getSheets() {
        return this.sheets;
    }

    /**
     * Returns if the User is the publisher
     * @return true if user is publisher
     */
    public boolean getPublisher() {
        return this.publisher;
    }

    /**
     * Sets this user as publisher
     */
    public void setPublisher() {
        this.publisher = true;
    }
}