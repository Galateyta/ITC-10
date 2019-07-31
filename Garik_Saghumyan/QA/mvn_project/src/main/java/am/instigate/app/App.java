package am.instigate.app;
import java.io.*;

public class App 
{
    public static void main(String[] args) throws IOException {
        Calculator calculator = new Calculator();
        File file = new File("src/resources/file.txt");
        String st;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            st = br.readLine();
        }
        String[] tmp = st.split("=");
        double result = calculator.doTheShuntingYard(tmp[0]);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(tmp[0] + '=' + result);
        }
        System.out.println(tmp[0] + '=' + result);
    }
}
