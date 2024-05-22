import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.valid.husksheets.Argument;

//result Json obj
public record Result(
    @JsonProperty("success") boolean success,
    @JsonProperty("message") String message,
    @JsonProperty("value") List<Argument> value) {
}
