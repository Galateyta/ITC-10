package com.mycompany.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assume.assumeNoException;

import org.junit.Test;

/**
 * Unit test for simple App.
 */
public class AppTest 
{
    /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue()
    {
        Calculator forTesting = new Calculator();
        assertEquals( 12.0 , forTesting.doTheShuntingYard("5 + 7 * 6 / ( 12 - 6 )"), 0.0);
    }
    @Test
    public void shouldAnswerWithError(){
        Calculator forTesting = new Calculator();
        assertEquals( 5.0 , forTesting.doTheShuntingYard("1 + 4"), 0.0);
    }
    @Test
    public void scope1()
    {
        Calculator forTesting = new Calculator();
        assertFalse( forTesting.scopeChecker("((()())()"));
    }

    @Test
    public void scope2()
    {
        Calculator forTesting = new Calculator();
        assertFalse( forTesting.scopeChecker("()())()"));
    }

    @Test
    public void scope3()
    {
        Calculator forTesting = new Calculator();
        assertTrue( forTesting.scopeChecker("(()())()"));
    }

    @Test
    public void pattern1()
    {
        Calculator forTesting = new Calculator();
        assertTrue( forTesting.patternChecker("1 2 3 4 . / * - + ( ) "));
    }

    @Test
    public void pattern2()
    {
        Calculator forTesting = new Calculator();
        assertFalse( forTesting.patternChecker("a 1 b 2"));
    }

    @Test
    public void pattern3()
    {
        Calculator forTesting = new Calculator();
        assertFalse( forTesting.patternChecker(" 1 2 3 & a @"));
    }
}
