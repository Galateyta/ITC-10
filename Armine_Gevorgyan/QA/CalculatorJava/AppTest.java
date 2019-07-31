

package com.mycompany.app;

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
     // @Test
     // public void foo() {
     //   Calculator calculator = new Calculator();
     //   assertEquals(12.0, calculator.doTheShuntingYard("5 + 7"));
     // }
    @Test
    public void checkAdditionMultiplay()
    {
      Calculator calculator = new Calculator();
      assertEquals(30, calculator.doTheShuntingYard(" 5 +* 6 "), 0.0);
    }

    @Test
    public void checkAdditionDiv()
    {
        Calculator calculator = new Calculator();
        assertEquals(7, calculator.doTheShuntingYard(" 42 +/ 6 "), 0.0);
    }

    @Test
    public void checkAdditionAdd()
    {
        Calculator calculator = new Calculator();
        assertEquals(11, calculator.doTheShuntingYard(" 5 *+ 6 "), 0.0);
    }

    @Test
    public void checkAdditionSub()
    {
        Calculator calculator = new Calculator();
        assertEquals(19, calculator.doTheShuntingYard(" 25 +- 6 "), 0.0);
    }

    @Test
    public void checkAddition()
    {
        Calculator calculator = new Calculator();
        assertEquals(19, calculator.doTheShuntingYard(" 24 - 6/ "), 0.0);
    }

    @Test
    public void checkResultAdd()
    {
        Calculator calculator = new Calculator();
        assertEquals(30, calculator.doTheShuntingYard(" 24 + 6 "), 0.0);
    }

    @Test
    public void checkResultSub()
    {
        Calculator calculator = new Calculator();
        assertEquals(18, calculator.doTheShuntingYard(" 24 - 6 "), 0.0);
    }

    @Test
    public void checkResultMul()
    {
        Calculator calculator = new Calculator();
        assertEquals(30, calculator.doTheShuntingYard(" 5 * 6 "), 0.0);
    }

    @Test
    public void checkResultDiv()
    {
        Calculator calculator = new Calculator();
        assertEquals(4, calculator.doTheShuntingYard(" 24 / 6 "), 0.0);
    }

    @Test
    public void shouldAnswerWithTrue()
    {
        assertTrue( true );
    }


//    @Test
//    public void checkAddition()
//    {
//        Calculator calculator = new Calculator();
//        assertEquals(12.0, calculator.doTheShuntingYard("5 +*  6"), 0.0);
//    }
}

