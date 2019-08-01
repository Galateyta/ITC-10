package am.instigate.app;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertNotEquals;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.*;

public class AppTest 
{
    @Rule
    public ExpectedException exception = ExpectedException.none();

    // input of function is correct and expected answer is correct
    @Test
    public void shouldAnswerCorrect() {
        Calculator calculator = new Calculator();
        assertEquals("shouldAnswerCorrect test function failed",7.0, calculator.doTheShuntingYard("((5 + 2) * 2)/2") );
    }

    // input of function is correct but expected answer is wrong
    @Test
    public void shouldAnswerNotCorrect() {
        Calculator calculator = new Calculator();
        assertNotEquals("shouldAnswerNotCorrect test function failed",0.0, calculator.doTheShuntingYard("5 + 2 * 4/2") );
    }

    // input of function is empty and execpted exeption is IllegalArgumentException
    @Test
    public void emptyExpression() {
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Empty expression or null");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("");
    }

    // input of function is empty string and execpted exeption is IllegalArgumentException
    @Test
    public void throwsArithmeticExeption() {
        exception.expect(ArithmeticException.class);
        exception.expectMessage("Division by 0");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("((5 + 2) * 2)/0");
    }

    @Test
    public void throwsIllegalArgumentExeption() {
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Invalid Expression:a+7");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("a+7");

    }
    @Test
    public void invalidOperator() {
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Invalid Expression:5^7");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("5^7");

    }
    @Test
    public void checkMainWithCorrectFile() throws IOException {
        System.out.println("main");
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
        assertEquals( "checkMainWithCorrectFile test function failed",12.0, result );
    }
    @Test
    public void checkMainWithInvalidFile() throws IOException {
        exception.expect(IllegalArgumentException.class);
        Calculator calculator = new Calculator();
        File file = new File("src/resources/file1.txt");
        String st;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            st = br.readLine();
        }
        String[] tmp = st.split("=");
        double result = calculator.doTheShuntingYard(tmp[0]);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(tmp[0] + '=' + result);
        }
    }

    @Test
    public void checkMainWithoutFilePath() throws IOException {
        exception.expect(FileNotFoundException.class);
        exception.expectMessage("No such file or directory");
        File file = new File("");
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
        }
    }
}
