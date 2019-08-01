package com.mycompany.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import java.io.*;

/**
 * Unit test for simple App.
 */
public class AppTest 
{
    public String readFile(String path) throws IOException {
        File file = new File(path);

        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);

        String line = br.readLine();

        br.close();
        fr.close();
        return line;
    }

    public void writeFile(String path, String line) throws IOException {
        File file = new File(path);

        FileWriter fw = new FileWriter(file);
        BufferedWriter bw = new BufferedWriter(fw);

        bw.write(line);

        bw.close();
        fw.close();
    }

    @Test
    public void shouldAnswerWithTrue()
    {
        assertTrue( true );
    }

    @Test
    public void shouldBeEqual() {
        FullCalculator calc = new FullCalculator();

        assertEquals("error","6.0", calc.start("1 + 5 ") );
    }

    @Test
    public void shouldThrowScopeException() {
        FullCalculator calc = new FullCalculator();

        assertEquals("error","error", calc.start("1 + 5 + (") );
    }

    @Test
    public void shouldReadAndWrite() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "2 + 6 - 3";
        final String expected = input + " = 5.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Not equal", expected, actual);
    }

    @Test
    public void checkAdd() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "1 + 5";
        final String expected = input + " = 6.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Add", expected, actual);
    }

    @Test
    public void checkScope() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "2 + 5 - 4 )";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Scopes", expected, actual);
    }

    @Test
    public void checkMultioperator() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "1 + + + 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Multi operator", expected, actual);
    }

    @Test
    public void checkScope2() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "( 23 – 2 / 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Scopes", expected, actual);
    }

    @Test
    public void checkDivideByZero() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "( 2 + 2 ) / 0";
        final String expected = input + " = Infinity";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Divide by zero", expected, actual);
    }

    @Test
    public void checkHard() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "62 + 2.5 / 27.5 * ( 2 + 0.2 )";
        final String expected = input + " = 62.2";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Hard", expected, actual);
    }

    @Test
    public void checkMinus() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "( -2 * 2 ) * -4 / 1";
        final String expected = input + " = 16.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Minus", expected, actual);
    }

    @Test(expected = ArrayIndexOutOfBoundsException.class)
    public void checkAziz() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "Barev aziz :D";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
    }

    @Test
    public void checkUndefined() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "2 * x + 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Undefined", expected, actual);
    }

    @Test
    public void checkExpression() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "23 - 2 + -16 / 2 = 13.0";
        final String expected = input + " true";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Expression", expected, actual);
    }

    @Test
    public void checkHardExpression() throws IOException {
        final String path = "src/resources/file.txt";
        final String input = "( 152 - 233 ) * 24666 - 2 / ( 122 / -122 ) + 1 = -1997943.0";
        final String expected = input + " true";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Hard expression", expected, actual);
    }

    @Test(expected = FileNotFoundException.class)
    public void checkInvalidFilePath() throws IOException {
        final String path = "src/resources/notExistingFile.txt";
        final String input = "1 + 1";
        final String expected = input + " = 2.0";

        readFile(path);
    }
}
