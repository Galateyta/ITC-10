import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws IOException {
        Calculator calculator = new Calculator();
        List list = new ArrayList();
        try {
            File file = new File("src/resources/file.txt");
            BufferedReader br = new BufferedReader(new FileReader(file));
            String st = br.readLine();
            br.close();
            String[] tmp = st.split("=");
            double result = calculator.doTheShuntingYard(tmp[0]);
            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            writer.write(tmp[0] + '=' + result);
            writer.close();
            System.out.println(tmp[0] + '=' + result);
        } catch (IOException e) {
            System.out.println(list);
            e.printStackTrace();
        }

    }
}