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
    @Test
    public void shouldAnswerWithTrue()
    {
        boolean actual = App.checkBraces("as(h)ghj(jhj)");
        assertTrue(actual);
       
    }
    @Test
    public void shouldAnswerWithTrue1()
    {
        boolean actual =  App.checkBraces("(ghgh(hjhj(jhhj)))");
        assertTrue(actual);       
    }
    @Test
    public void shouldAnswerWithTrue2()
    {
        boolean actual = App.checkBraces(")df(df");
        assertFalse(actual);
    }
    @Test
    public void shouldAnswerWithTrue3()
    {
        boolean actual = App.checkBraces("df)df");
        assertFalse(actual);
    }
    @Test
    public void shouldAnswerWithTrue4()
    {
        boolean actual = App.checkBraces(")dfdf");
        assertFalse(actual);
    }
    @Test
    public void shouldAnswerWithTrue5()
    {
        boolean actual = App.checkBraces("dfdf)(");
        assertFalse(actual);          
    }
}
