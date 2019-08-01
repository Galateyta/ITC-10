package am.instigate.app;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.*;

public class AppTest 
{
    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Test
    public void shouldAnswerWithTrue() {
        Calculator calculator = new Calculator();
        assertEquals(7.0, calculator.doTheShuntingYard("((5 + 2) * 2)/2") );
    }
    @Test
    public void throwsArithmeticExeption() {
        exception.expectMessage("Division by 0");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("((5 + 2) * 2)/0");
    }

    @Test
    public void shouldAnswerWithError() {
        Calculator calculator = new Calculator();
        assertNotEquals(0.0, calculator.doTheShuntingYard("5 + 2 * 4/2") );
    }

    @Test
    public void throwsIllegalArgumentExeption() {
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Invalid Expression:a+7");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("a+7");

    }
    @Test
    public void testMain() throws IOException {
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
        assertEquals(12.0, result );
    }
    @Test
    public void testMain1() throws IOException {
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
}
