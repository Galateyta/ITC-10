

package com.mycompany.app;
import org.junit.rules.ExpectedException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.io.*;
import java.util.*;

import static org.junit.Assert.*;

import org.junit.Test;

/**
 * Unit test for simple App.
 */
public class AppTest
{
    /**
     * Rigorous Test :-)
     */

    //check validation + hes been ignored,
    @Test
    public void checkAdditionMultiplay()
    {
      Calculator calculator = new Calculator();
      assertEquals("check result after validate on checkAdditionMultiplay function",30, calculator.doTheShuntingYard(" 5 +* 6 "), 0.0);
    }

    //check validation + hes been ignored,
    @Test
    public void checkAdditionDiv()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result after validate on checkAdditionDiv function", 7, calculator.doTheShuntingYard(" 42 +/ 6 "), 0.0);
    }

    //check validation * hes been ignored,
    @Test
    public void checkAdditionAdd()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result after validate on checkAdditionSub function", 11, calculator.doTheShuntingYard(" 5 *+ 6 "), 0.0);
    }

    //check validation + hes been ignored,
    @Test
    public void checkAdditionSub()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result after validate on checkAdditionSub function", 19, calculator.doTheShuntingYard(" 25 +- 6 "), 0.0);
    }

    //check result of  adding
    @Test
    public void checkResultAdd()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result of adding function test", 30, calculator.doTheShuntingYard(" 24 + 6 "), 0.0);
    }

    //check result of  subtraction
    @Test
    public void checkResultSub()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result of subtraction function test",18, calculator.doTheShuntingYard(" 24 - 6 "), 0.0);
    }

    //check result of  multiply
    @Test
    public void checkResultMul()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result of multiply function test",30, calculator.doTheShuntingYard(" 5 * 6 "), 0.0);
    }

    //check result of  division
    @Test
    public void checkResultDiv()
    {
        Calculator calculator = new Calculator();
        assertEquals("check result of division function test",4, calculator.doTheShuntingYard(" 24 / 6 "), 0.0);
    }

    //open file read on file , close file
    @Test
    public void readFile() throws Exception {
        try {
            File file = new File("src/resources/readFile.txt");
            BufferedReader br = new BufferedReader(new FileReader(file));
            String curline = br.readLine();
            System.out.println(curline);
            br.close();
            assertEquals("readFile function test","5 + 60", curline);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //open file read expression(s), solve , and write result in file , but if writing 2 expressions,
    // compare left and  right expressions then write in file true or false
    @Test
    public void checkValidExeption() throws IOException {
        Calculator calculator = new Calculator();
        File file = new File("src/resources/file.txt");
        String curline;
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            curline = br.readLine();
            String[] tmp = curline.split("=");
            if (tmp.length == 2) {
                double resultLeft = calculator.doTheShuntingYard(tmp[0]);
                double resultRight = calculator.doTheShuntingYard(tmp[1]);
                String numberAsStringLeft = Double.toString(resultLeft);
                String numberAsStringRight = Double.toString(resultRight);

                System.out.println(resultRight);
                if (resultLeft == resultRight) {
                   try {
                       BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                       writer.write(tmp[0] + " = " + tmp[1] + " //true");
                       writer.close();
                       assertEquals("checkValidExeption test function valid",numberAsStringLeft, numberAsStringRight);
                       //assertEquals(resultLeft, resultRight);
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
                } else {
                    try {
                        BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                        writer.write(tmp[0] + " = " + tmp[1] + " //false");
                        assertNotEquals("checkValidExeption test function valid", numberAsStringLeft, numberAsStringRight);
                        writer.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            } else {
                double result = calculator.doTheShuntingYard(tmp[0]);
                String numberAsString = Double.toString(result);
                BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                writer.write(tmp[0] + " = " + result);
                writer.close();
                assertEquals("checkValidExeption test function valid", "11.0", numberAsString);
            }
            br.close();
        } finally {

        }
    }

    // open file for writing , close file, then open file for reading, close file, compare writing and reading text
     @Test
    public void writeFile() throws Exception {
        File file = new File("src/resources/test.txt");
        BufferedWriter writer = new BufferedWriter(new FileWriter(file));
        writer.append("new text");
        writer.close();
        BufferedReader br = new BufferedReader(new FileReader(file));
        String curline = br.readLine();
        System.out.println(curline);
        br.close();
        assertEquals("writeFile function test","new text", curline );
    }


    // input  expression is empty . then expected illegalArgumentException exception with message Empty expression or null
    @Test (expected = IllegalArgumentException.class)
    public void emptyExpression() {
        ExpectedException exception = ExpectedException.none();
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Empty expression or null");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard(" ");
	      fail("Should have thrown an exception - Empty expression or null");
    }

    // input  expression has been invalid expression . then expected illegalArgumentException exception with message Invalid Expression: 88$6
    @Test (expected = IllegalArgumentException.class)
    public void invalidExpression() {
        ExpectedException exception = ExpectedException.none();
        exception.expect(IllegalArgumentException.class);
        exception.expectMessage("Invalid Expression: 88$6");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("88$6");
	      fail("Should have thrown an exception - Invalid Expression: 88$6");
    }

    // trying open file and read ,but path is  empty , then expected  FileNotFoundException exception with message No such file or directory
    @Test (expected = FileNotFoundException.class)
    public void checkMainWithoutFilePath() throws IOException {
        ExpectedException exception = ExpectedException.none();
        exception.expect(FileNotFoundException.class);
        exception.expectMessage("No such file or directory");
        File file = new File("~/");
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
        }
	      fail("Should have thrown an exception - No such file or directory");
    }

    // input expression has been dividing by 0 , then expected ArithmeticException exception  with message Division by 0
    @Test (expected = ArithmeticException.class)
    public void throwsArithmeticExeption() {
        ExpectedException exception = ExpectedException.none();
        exception.expect(ArithmeticException.class);
        exception.expectMessage("Division by 0");
        Calculator calculator = new Calculator();
        calculator.doTheShuntingYard("((7 + 9) / 2)/0");
	      fail("Should have thrown an exception - Division by 0");

    }


}

