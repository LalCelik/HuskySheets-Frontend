package com.valid.husksheets.model;

import java.util.List;

public class User {
  private String username;
  private String password;
  private List sheets;

  public User(String username, String password, List sheets) {
    this.username = username;
    this.password = password;
    this.sheets = sheets;
  }

  /**
   * Are two Users the same?
   * @param user User being compared to
   * @return true if the usernames are the same, else return false
   */
  @Override
  public boolean equals(User user) {
    return this.username.equals(user.username);
  }

  /**
   * Creates a unique hashcode for this User based on the User's username
   * and password
   * @return hashcode
   */
  @Override
  public int hashCode() {
    int hash = this.username.hashCode();
    hash += this.password.hashCode();

    return hash;
  }

  /**
   * Returns the User's username
   * @return User's username
   */
  public getUsername() {
    return this.username;
  }


}

