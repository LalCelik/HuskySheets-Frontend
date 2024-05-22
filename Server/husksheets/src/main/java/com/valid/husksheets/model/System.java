package com.valid.husksheets.model;

import java.util.List;

/**
 * System that holds a list of Users. If the system is preset with a list of Users, assume all
 * Users are unique.
 */
public class System {
  private List<User> users;

  public System(List<User> users) {
    this.users = users;
  }

  public System() {
    this.users = new ArrayList<User>();
  }

  /**
   * Adds a User to the system
   */
  protected void addUser(User user) {
    for (int i = 0; i < users.size(); i++) {
      if (users.get(i).equals(user)) {
        throw new IllegalArgumentException("User already exists in the system. Create a different" +
                "username.")
      }
    }
    users.add(user);
  }


}