package jokeDTO;

public class DadDTO {

    private final static String RANDOM_URL = "https://icanhazdadjoke.com";
    private String joke;
    private String status;
    private String id;

    public DadDTO() {

    }

    public DadDTO(String joke, String status, String id) {
        this.joke = joke;
        this.status = status;
        this.id = id;
    }

    public String getJoke() {
        return joke;
    }

    public void setJoke(String joke) {
        this.joke = joke;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public static String getRANDOM_URL() {
        return RANDOM_URL;
    }

}