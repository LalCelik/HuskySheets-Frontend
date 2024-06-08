package com.valid.husksheets.JSON;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Argument received through REST api calls
 * Owner: Lal
 * @param publisher name of the publisher
 * @param sheet name of the sheet
 * @param id relevant id
 * @param payload relevant data of the call
 */
public record Argument(
        @JsonProperty("publisher") String publisher,
        //name of sheet
        @JsonProperty("sheet") String name,
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

    public int getId() {
        return id.intValue();
    }
<<<<<<< HEAD
=======

    public String getPayload() {
        return payload;
    }
>>>>>>> bcea8081d2601a7c22294dc894ab014f89d59a02
}