package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;


public record UserArgument(
        //username of user
        @JsonProperty("username") String username,
        //password of a user
        @JsonProperty("password") String password,
        // list of sheets the user has
        @JsonProperty("sheets") List<Integer> sheets) {

  // getter for the username
  public String getUsername() {
    return username;
  }

  // getter for the password
  public String getPassword() {
    return password;
  }

  // getter for the sheets
  public String getSheets() {
    return sheets;
  }
}