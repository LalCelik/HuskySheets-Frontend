import com.fasterxml.jackson.annotation.JsonProperty;

//Argument Json obj
public record Argument(
    @JsonProperty("publisher") String publisher,
    //name of sheet
    @JsonProperty("sheet") String sheet,
    //update to a sheet
    @JsonProperty("id") Number id,
    //the data for an update
    @JsonProperty("payload") String payload) {
}
