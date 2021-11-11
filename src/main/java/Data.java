
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Data implements Serializable {
    @Id
    @SequenceGenerator(name = "idSequence", sequenceName = "idSequence", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idSequence")
    private int id;
    private static final long serialVersionUID = 1L;
    private Double x;
    private Double y;
    private Double r;
    private String time;
    private String answer;
    private double scriptTime;

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
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

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
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
        return x <= 0 && x >= -r && y <= 0 && y >= -r;
    }

    private boolean triangle(double x, double y, double r) {
        return x >= 0 && x <= r && y >= 0 && y <= r - x;
    }

    private boolean circle(double x, double y, double r) {
        return x >= 0 && x <= r && y <= 0 && y * y <= -x * x + r * r;
    }

    public void checkAll() {
        if (rectangle(x, y, r) || triangle(x, y, r) || circle(x, y, r)) {
            answer = "да";
        } else answer = "нет";
    }

    @Override
    public String toString() {
        return "Data{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", time=" + time +
                ", scriptTime=" + scriptTime +
                ", answer=" + answer +
                '}';
    }

    @Override
    public int hashCode() {
        return x.hashCode() + y.hashCode() +
                r.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof Data) {
            Data dataObj = (Data) obj;
            return x.equals(dataObj.getX()) &&
                    y.equals(dataObj.getY()) &&
                    r.equals(dataObj.getR()) &&
                    time.equals(dataObj.getTime()) &&
                    answer.equals(dataObj.getAnswer());
        }
        return false;
    }
}