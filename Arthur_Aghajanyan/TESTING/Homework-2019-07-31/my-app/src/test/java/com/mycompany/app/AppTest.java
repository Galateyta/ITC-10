package com.mycompany.app;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class AppTest {

    @Test
    public void shouldAnswerWithTrue() {
        assertTrue(true);
    }

    @Test
    public void rightAnswer() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 * 8 ) + 8";
        assertEquals("rightAnswer", "72.0", tester.start(input));
    }

    @Test
    public void scops() {
        FullCalculator tester = new FullCalculator();
        String input = " 8 + 9 * 7 (";
        assertEquals("scops", "true", tester.start(input));
    }

    @Test
    public void divideByZero() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + 9 ) / 0 ";
        assertEquals("divideByZero", "error", tester.start(input));
    }

    @Test
    public void multiOperator() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + + 9 ) ";
        assertEquals("multiOperator", "eror", tester.start(input));
    }

    @Test
    public void undefinedOperand() {
        FullCalculator tester = new FullCalculator();
        String input = " ( 8 + x + 9 ) ";
        assertEquals("undefinedOperand", "eror", tester.start(input));
    }

    @Test
    public void newLineChar() {
        FullCalculator tester = new FullCalculator();
        String input = "  8 + 9 \n + 9  ";
        assertEquals("newLineChar", "25.0", tester.start(input));
    }

    @Test
    public void fileReaderTest() throws IOException {
        Checker tester = new Checker(); 
        String input = "/home/abul/Desktop/MAVEN/my-app/file.txt";
        assertEquals("fileReaderTest", "40 * ( 2 + 4 )",  tester.readerForTest(input));
    }
}
