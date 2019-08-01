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
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "2 + 6 - 3";
        final String expected = input + " = 5.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Not equal", expected, actual);
    }

    @Test
    public void add() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "1 + 5";
        final String expected = input + " = 6.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Add", expected, actual);
    }

    @Test
    public void scope() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "2 + 5 - 4 )";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Scopes", expected, actual);
    }

    @Test
    public void multioperator() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "1 + + + 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Multi operator", expected, actual);
    }

    @Test
    public void scope2() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "( 23 – 2 / 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Scopes", expected, actual);
    }

    @Test
    public void divideByZero() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "( 2 + 2 ) / 0";
        final String expected = input + " = Infinity";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Divide by zero", expected, actual);
    }

    @Test
    public void hard() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "62 + 2.5 / 27.5 * ( 2 + 0.2 )";
        final String expected = input + " = 62.2";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Hard", expected, actual);
    }

    @Test
    public void minus() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "( -2 * 2 ) * -4 / 1";
        final String expected = input + " = 16.0";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Minus\n", expected, actual);
    }

    @Test(expected = ArrayIndexOutOfBoundsException.class)
    public void aziz() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "Barev aziz :D";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
    }

    @Test
    public void undefined() throws IOException {
        final String path = "/home/student/Desktop/my-app/file.txt";
        final String input = "2 * x + 3";
        final String expected = input + " = error";

        writeFile(path, input);
        Checker.run(path);
        final String actual = readFile(path);

        assertEquals("Undefined\n", expected, actual);
    }
}
