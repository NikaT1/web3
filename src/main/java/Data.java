
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Data implements Serializable {
    @Id
    @SequenceGenerator( name = "idSequence", sequenceName = "idSequence", allocationSize = 1, initialValue = 1 )
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "idSequence")
    private int id;
    private static final long serialVersionUID = 1L;
    private double x;
    private double y;
    private double r;
    private String time;
    private String answer;
    private double scriptTime;

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getTime() {
        return time;
    }

    public String getAnswer() {
        return answer;
    }

    public double getScriptTime() {
        return scriptTime;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public void setScriptTime(double scriptTime) {
        this.scriptTime = scriptTime;
    }

    private boolean rectangle(double x, double y, double r) {
        return x >= 0 && x <= r && y >= 0 && y <= r;
    }

    private boolean triangle(double x, double y, double r) {
        return x >= 0 && x <= r && y <= 0 && y >= x / 2 - r / 2;
    }

    private boolean circle(double x, double y, double r) {
        return x <= 0 && x >= -r && y >= 0 && y * y <= -x * x + r * r;
    }

    public void checkAll() {
        if (rectangle(x, y, r) || triangle(x, y, r) || circle(x, y, r)) {
            answer = "да";
        } else answer = "нет";
    }
}