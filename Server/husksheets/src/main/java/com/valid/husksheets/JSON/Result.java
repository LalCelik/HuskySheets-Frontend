package com.valid.husksheets.JSON;


import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

//result Json obj
public record Result(
    @JsonProperty("success") boolean success,
    @JsonProperty("message") String message,
    @JsonProperty("value") List<Argument> value) {
}
