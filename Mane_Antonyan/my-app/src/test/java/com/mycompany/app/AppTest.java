package com.mycompany.app;

import java.io.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

public class AppTest {
    @Test
    public void testEvaluateEasyPositiveCase() {
        Calculator c = new Calculator();
        assertEquals(22.0, c.evaluate("10 + 2 * 6"), 0.0);
    }

    @Test
    public void testEvaluatePositiveCaseHard() {
        Calculator c = new Calculator();
        assertEquals(100.0, c.evaluate("100 * ( 2 + 12 ) / 14"), 0.0);
    }

    @Test
    public void testHasPrecedenceExtraBracket() {
        Calculator cal = new Calculator();
        assertTrue(cal.hasPrecedence('(', '(')); 
    }

    @Test
    public void testHasPrecedenceReverseBrackets() {
        Calculator cal = new Calculator();
        assertTrue(cal.hasPrecedence(')', '('));
    }
    
    @Test
    public void testEvaluateAssignmentRValue() {
        Calculator c = new Calculator();
        File f = new File("../../../../../test.txt");
        String str = "7 = a";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(f))) {
            writer.write(str);
        } catch(IOException e) {
            e.printStackTrace();
        }

        try (BufferedReader br = new BufferedReader(new FileReader(f))) {
            str = br.readLine();
        } catch(IOException e) {
            e.printStackTrace();
        }

        assertEquals("7 = 7.0", str);
    }

    @Test
    public void testEvaluateDevitionByZero() {
        Calculator c = new Calculator();
        boolean thrown = false;
        try {
            c.evaluate("2 / 0");
        } catch (UnsupportedOperationException e) {
            thrown = true;
        }
        assertTrue(thrown);
    }
    
    @Test
    public void testHasPrecedenceMultiOperations() {
        Calculator cal = new Calculator();
        assertTrue(cal.hasPrecedence('/', '/'));
    }

    @Test
    public void testEvaluateUnexpectedSymbol() {
        Calculator c = new Calculator();
        boolean thrown = false;
        try {
            c.evaluate("2 + a");
        } catch (Error e) {
            thrown = true;
        }
        assertTrue(thrown);
    }
}