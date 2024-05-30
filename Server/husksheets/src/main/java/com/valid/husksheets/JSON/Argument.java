package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Argument received through REST api calls
 * Owner: Lal
 * @param publisher name of the publisher
 * @param name name of the sheet
 * @param id relevant id
 * @param payload relevant data of the call
 */
public record Argument(
        @JsonProperty("publisher") String publisher,
        //name of sheet
        @JsonProperty("name") String name,
        //update to a sheet
        @JsonProperty("id") Number id,
        //the data for an update
        @JsonProperty("payload") String payload) {

    /**
     * Getter method for publisher
     * @return String name of the publisher
     */
    public String getPublisher() {
        return publisher;
    }

    /**
     * Getter method for the name
     * @return String name of the sheet
     */
    public String getName() {
        return name;
    }
}