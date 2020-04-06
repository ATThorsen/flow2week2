package rest;

import com.google.gson.Gson;
import java.io.IOException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import jokeDTO.ChuckDTO;
import jokeDTO.DadDTO;
import jokeDTO.JokesDTO;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {

    @Context
    private UriInfo context;
    private final static Gson GSON = new Gson();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJokes() {
        try {
            String chuckString = HttpUtils.fetchData(ChuckDTO.getRANDOM_URL());
            String dadString = HttpUtils.fetchData(DadDTO.getRANDOM_URL());
            ChuckDTO chuck = GSON.fromJson(chuckString, ChuckDTO.class);
            DadDTO dad = GSON.fromJson(dadString, DadDTO.class);
            JokesDTO jokes = new JokesDTO(chuck, dad);
            return GSON.toJson(jokes);
        } catch (IOException ex) {
            return "{\"info\":\"Error\"}";
        }
    }

}