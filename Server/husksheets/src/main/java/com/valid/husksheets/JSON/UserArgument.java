package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;


public record UserArgument(
        //username of user
        @JsonProperty("username") String username,
        //password of a user
        @JsonProperty("password") String password) {

  // getter for the username
  public String getUsername() {
    return username;
  }

  // getter for the password
  public String getPassword() {
    return password;
  }
}