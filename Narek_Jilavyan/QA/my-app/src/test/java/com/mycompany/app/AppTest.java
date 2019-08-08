package com.mycompany.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assume.assumeNoException;

import java.io.IOException;

import org.junit.rules.ExpectedException;

import org.junit.Test;
import org.junit.Rule;

import java.io.*;


/**
 * Unit test for simple App.
 */

public class AppTest {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    /**
     * Rigorous Test :-)
     */

    @Test
    // project test. invalid file
    public void projectInvalidFileTest() throws IOException {
        Calculator forTesting = new Calculator();
        thrown.expect(IOException.class);
        thrown.expectMessage("No such file or directory");

        forTesting.global("input1.txt");
    }

    @Test
    // project test. empty file
    public void projectEmptyFileTest() throws IOException {
        Calculator forTesting = new Calculator();
        thrown.expect(java.lang.NullPointerException.class);

        forTesting.global("resources/input3.txt");
    }

    @Test
    // project test. valid file and valid expression
    public void projectInvalidExpressionTest() throws IOException {
        Calculator forTesting = new Calculator();

        forTesting.global("resources/input1.txt");

        File file = new File("resources/input1.txt");
        String st;
        BufferedReader br = new BufferedReader(new FileReader(file));
        st = br.readLine();

        assertEquals("global function (write) ", "4 + 5 - 8 = 12 * 0 + 1 is true" , st);
    }

    @Test
    // project test. valid file and invalid expression
    public void projectTest() throws IOException {
        Calculator forTesting = new Calculator();
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("unnecessary symbol");

        forTesting.global("resources/input2.txt");
    }

    @Test
    // project test. empty filename
    public void projectEmptyFilenameTest() throws IOException {
        Calculator forTesting = new Calculator();
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("empty filename");

        forTesting.global("");
    }

    @Test
    // shunting yard test. valid expression
    public void shuntingYardTest() throws IOException {
        Calculator forTesting = new Calculator();
        assertEquals("shunting yard function", 12.0, forTesting.doTheShuntingYard("5 + 7 * 6 / ( 12 - 6 )"), 0.0);
    }

    @Test
    // shunting yard test. in valid expression ( " 5 / 0" ( "Division by 0" ) )
    public void shuntingYardDivisionByZeroTest() {
        Calculator forTesting = new Calculator();
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("Division by 0");

        forTesting.doTheShuntingYard("5 / 0");
    }

    @Test
    // scope checker test. in valid expression ( "((()())()" ( "extra scope" ) )
    public void scopeCheckerExtraTest() {
        Calculator forTesting = new Calculator();
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("extra scope");

        forTesting.scopeChecker("((()())()");
    }

    @Test
    // scope checker test. in valid expression ( "()())()" ( "missing scope" ) )
    public void scopeCheckerMissingTest() {
        Calculator forTesting = new Calculator();
        thrown.expect(IllegalArgumentException.class);
        thrown.expectMessage("missing scope");

        forTesting.scopeChecker("()())()");
    }

    @Test
    // scope checker test. in valid expression ( "(()())()" ( true ) )
    public void scopeCheckeTest() {
        Calculator forTesting = new Calculator();
        assertTrue("scope checker", forTesting.scopeChecker("(()())()"));
    }

    @Test
    // pattern checker test. valid expression ( "1 2 3 4 . / * - + ( ) " ( true ) )
    public void patternCheckerTest() {
        Calculator forTesting = new Calculator();
        assertTrue( "pattern checker",forTesting.patternChecker("1 2 3 4 . / * - + ( ) "));
    }

    @Test
    // pattern checker test. valid expression ( "a 1 b 2" ( false ) )
    public void patternCheckerLetterTest() {
        Calculator forTesting = new Calculator();
        assertFalse(forTesting.patternChecker("a 1 b 2"));
    }

    @Test
    // pattern checker test. valid expression ( "1 2 3 & @" ( false ) )
    public void patternCheckerSymbolTest() {
        Calculator forTesting = new Calculator();
        assertFalse(forTesting.patternChecker(" 1 2 3 & @"));
    }
}
