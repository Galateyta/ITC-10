package com.mycompany.app;

import static org.junit.Assert.*;

import org.junit.Test;


public class AppTest 
{
    //Test for checkBracketsTest method-----------------------------------
    
    @Test
    public void checkBracketsTestTrue()
    {
        boolean actual = App.checkBrackets("as(h)ghj(jhj)");
        assertTrue("The brackets wher opened and closed correctly but the mistake waas:", actual);
       
    }
    @Test
    public void checkBracketsTestTrue1()
    {
        boolean actual =  App.checkBrackets("(ghgh(hjhj(jhhj)))");
        assertTrue("The brackets wher opened and closed correctly but the mistake waas:", actual);       
    }
    @Test
    public void checkBracketsTestFalse()
    {
        boolean actual = App.checkBrackets(")df(df");
        assertFalse("Was initially opened after it closed but was considered right:", actual);
    }
    @Test
    public void checkBracketsTest3()
    {
        boolean actual = App.checkBrackets("df)df");
        assertFalse("Alone closed the bracket but it was considered right:", actual);
    }
    @Test
    public void checkBracketsTest4()
    {
        boolean actual = App.checkBrackets(")dfdf");
        assertFalse("Alone closed the bracket but it was considered right:", actual);
    }
    @Test
    public void checkBracketsTest5()
    {
        boolean actual = App.checkBrackets("dfdf)(");
        assertFalse("Was initially opened after it closed but was considered right:", actual);          
    }

    //Test for resultReceipt method------------------------------------

   @Test
    public void resultReceiptTest1() throws Exception {
        assertEquals("The addition operation was not performed correctly:", 7, App.result("5+2"));
    }
    @Test
    public void resultReceiptTest2() throws Exception {
        assertEquals("The subtraction operation was not performed correctly:", 3, App.result("5-2"));
    }

    @Test
    public void resultReceiptTest2() throws Exception {
        assertEquals("The multiplication  operation was not performed correctly:", 10, App.result("5*2"));
    }

    @Test
    public void resultReceiptTest3() throws Exception {
        assertEquals("The separation operation was not performed correctly:", 3, App.result("6/2"));
    }

    @Test
    public void resultReceiptTest4() throws Exception {
        assertEquals("Arithmetic operations are not performed correctly:", 9, App.result("5+2*2"));
    }

    @Test
    public void resultReceiptTest5() throws Exception {
        assertEquals("Arithmetic operations are not performed correctly:", 3, App.result("5+2/2-3"));
    }

    //Test for result method----------------------------------------------

    @Test  
    public void resultTest1() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 35, App.result("17+6*(2+1)"));  
    } 

    @Test  
    public void resultTest2() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 29, App.result("17+(6-2)*(2+1)"));  
    } 

    @Test  
    public void resultTest3() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 20, App.result("17+(6+3)/(2+1)"));  
    } 

   /* @Test  
    public void resultTest4() {    
        assertEquals(7, App.result("(15/5)*2+1"));  
    } */
    
    @Test  
    public void resultTest5() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 0, App.result("0/5"));  
    } 

    @Test  
    public void resultTest6() {    
        assertEquals("Works wrong when getting a number:", 10, App.result("10"));  
    } 

    @Test  
    public void resultTest7() {    
        assertEquals("Working wrong when getting a blank line:", 0, App.result(""));  
    } 
}
