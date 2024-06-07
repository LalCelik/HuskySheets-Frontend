package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * UserArgument for the Registration REST api call
 * Owner: Victoria
 * @param username username from the api call
 * @param password password from the api call
 */
public record UserArgument(
        //username of user
        @JsonProperty("username") String username,
        //password of a user
        @JsonProperty("password") String password) {

  /**
   * Getter for the username
   * @return String representation of the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * Getter for the password
   * @return String representation of the password
   */
  public String getPassword() {
    return password;
  }
}