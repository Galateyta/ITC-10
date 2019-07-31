package am.Instigate.app;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Stack;
/**
 * Hello world!
 *
 */
public class App
{

    public static void main(String[] args) throws IOException {
        String filename = "src/resources/file.txt";
        App calc = new App();
        if(calc.readAndWriteInFile(filename)){
            System.out.println("Sucssesful");
        }else {
            System.out.println("Faild");
        }



    }


    public String readFile(String filename) throws IOException{
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = Files.newBufferedReader(Paths.get(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line).append("\n");
            }

        }
        return sb.toString();
    }



    public void writeInFile(String filename, String result) throws IOException {
        try (FileWriter fWrite = new FileWriter(filename, true)) {
            fWrite.write(result);

        }
    }
    public boolean readAndWriteInFile(String filename) throws IOException {
        String expression = this.readFile(filename);

        String[] tmp = expression.split("=");
        String leftPart = tmp[0];
        boolean isBalanced = this.areParanthesisBalanced(leftPart);

        if (isBalanced) {
            double leftResult = this.evalExpression(leftPart);

            if (tmp.length > 1) {
                if (tmp[1].length() > 1) {
                    double rigthPart = Double.parseDouble(tmp[1]);
                    if (rigthPart == leftResult) {
                        String text = "  true ";
                        this.writeInFile(filename, text);
                        return true;
                    }
                        String text = "  false ";
                        this.writeInFile(filename, text);
                        return true;
                }
                    double result = this.evalExpression(leftPart);
                    String text = " " + Double.toString(result);
                    this.writeInFile(filename, text);
                    return true;


            }
                double result = this.evalExpression(leftPart);
                String text = " = " + result;
                this.writeInFile(filename, text);
                return true;


        }
            System.out.println("In expression the paranthes is not balanced");
        return false;
    }


    public int priority(char op) {
        switch (op) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    }

    public double operation(double a, double b, char op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }

    }


    public boolean areParanthesisBalanced(String str) {
        int count = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == '(' && str.charAt(i + 1) == ')') {
                return false;
            }
            if (str.charAt(i) == '(') {
                count++;
            }
            if (str.charAt(i) == ')') {
                count--;
            }

            if (count < 0) {
                return false;
            }

        }
        if (count > 0) {
            return false;
        }
        return true;

    }

    public double evalExpression(String str) {
        int i;
        Stack<Double> numbers = new Stack<Double>();
        Stack<Character> operations = new Stack<Character>();

        for (i = 0; i < str.length(); i++) {

            if (str.charAt(i) == ' ') {
                continue;
            }

            if (str.charAt(i) == '(') {
                operations.push(str.charAt(i));
            } else if (Character.isDigit(str.charAt(i))) {
                double val = 0;

                while (i < str.length() && Character.isDigit(str.charAt(i))) {
                    val = (val * 10) + (str.charAt(i) - '0');
                    i++;
                }

                numbers.push(val);
            } else if (str.charAt(i) == ')') {

                while (!operations.isEmpty() && operations.peek() != '(') {
                    double num2 = numbers.peek();
                    numbers.pop();

                    double num1 = numbers.peek();
                    numbers.pop();

                    char op = operations.peek();
                    operations.pop();

                    numbers.push(operation(num1, num2, op));
                }
                operations.pop();
            } else {
                while (!operations.isEmpty() && priority(operations.peek())
                        >= priority(str.charAt(i))) {
                    double num2 = numbers.peek();
                    numbers.pop();

                    double num1 = numbers.peek();
                    numbers.pop();

                    char op = operations.peek();
                    operations.pop();

                    numbers.push(operation(num1, num2, op));
                }
                operations.push(str.charAt(i));
            }
        }
        while (!operations.isEmpty()) {
            double num2 = numbers.peek();
            numbers.pop();

            double num1 = numbers.peek();
            numbers.pop();

            char op = operations.peek();
            operations.pop();

            numbers.push(operation(num1, num2, op));
        }

        return numbers.peek();
    }

}
