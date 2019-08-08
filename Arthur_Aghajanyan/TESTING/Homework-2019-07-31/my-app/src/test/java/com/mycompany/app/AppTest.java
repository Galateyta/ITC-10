package com.mycompany.app;
import java.io.IOException;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class AppTest {
    //function assigned to test simple expression
    @Test
    public void rightAnswer() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 * 8 ) + 8";
        assertEquals("rightAnswer", "72.0", tester.start(input));
    }

    //function assigned to test incorrect scope
    @Test
    public void incorrectScops() {
        FullCalculator tester = new FullCalculator();
        String input = " 8 + 9 * 7 (";
        assertEquals("scops", "error", tester.start(input));
    }

    //function assigned to test division by zero
    @Test
    public void divideByZero() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + 9 ) / 0 ";
        assertEquals("divideByZero", "Infinity", tester.start(input));
    }

    //function assigned to test consecutive operators
    @Test
    public void consecutiveOperator() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + + 9 ) ";
        assertEquals("multiOperator", "error", tester.start(input));
    }

    //function assigned to test undefined operand
    @Test
    public void undefinedOperand() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + x + 9 ) ";
        assertEquals("undefinedOperand", "error", tester.start(input));
    }

    //function assigned to test new line char
    @Test
    public void newLineChar() {
        FullCalculator tester = new FullCalculator();
        String input = "  8 + 9 \n + 9 ";
        assertEquals("newLineChar", "26.0", tester.start(input));
    }

    //test function is assigned to read the correct and incorrect files
    @Test
    public void fileReaderAndWriterTest() throws IOException {
        Checker tester = new Checker(); 
        String input = "src/resources/file.tx";
        assertEquals("return error status code", 1, tester.reader(input));
        }

}
