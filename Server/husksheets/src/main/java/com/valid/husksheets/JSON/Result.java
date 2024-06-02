package com.valid.husksheets.JSON;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Result object for the REST api call
 * Owner: Lal
 * @param success boolean value of success
 * @param message relevant message of the result
 * @param value value of the result
 */
public record Result(
        @JsonProperty("success") boolean success,
        @JsonProperty("message") String message,
        @JsonProperty("value") List<Argument> value) {
}