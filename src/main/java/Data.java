import java.io.Serializable;

public class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private double x;
    private double y;
    private double r;
    private String time;
    private String answer;
    private boolean isValid;
    private double scripTime;

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

    public boolean isValid() {
        return isValid;
    }

    public double getScripTime() {
        return scripTime;
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

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public void setScripTime(double scripTime) {
        this.scripTime = scripTime;
    }
}