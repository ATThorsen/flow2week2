package jokeDTO;

public class JokesDTO {
    
    private String joke1;
    private String joke1Reference;
    private String joke2;
    private String joke2Reference;

    public JokesDTO(ChuckDTO chuck, DadDTO dad) {
        this.joke1 = chuck.getValue();
        this.joke1Reference = ChuckDTO.getRANDOM_URL();
        this.joke2 = dad.getJoke();
        this.joke2Reference = DadDTO.getRANDOM_URL();
    }

    public String getJoke1() {
        return joke1;
    }

    public void setJoke1(String joke1) {
        this.joke1 = joke1;
    }

    public String getJoke1Reference() {
        return joke1Reference;
    }

    public void setJoke1Reference(String joke1Reference) {
        this.joke1Reference = joke1Reference;
    }

    public String getJoke2() {
        return joke2;
    }

    public void setJoke2(String joke2) {
        this.joke2 = joke2;
    }

    public String getJoke2Reference() {
        return joke2Reference;
    }

    public void setJoke2Reference(String joke2Reference) {
        this.joke2Reference = joke2Reference;
    }
    
    
}