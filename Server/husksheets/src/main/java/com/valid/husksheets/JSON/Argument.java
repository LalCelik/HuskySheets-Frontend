package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;


public record Argument(
    @JsonProperty("publisher") String publisher,
    //name of sheet
    @JsonProperty("name") String name,
    //update to a sheet
    @JsonProperty("id") Number id,
    //the data for an update
    @JsonProperty("payload") String payload) {

        // Getter method for publisher
    public String getPublisher() {
        return publisher;
    }
    
    // Getter method for sheet
    public String getSheet() {
        return name;
    }
}

