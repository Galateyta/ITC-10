package com.mycompany.app;

import static org.junit.Assert.*;

import org.junit.Test;


public class AppTest 
{
    //Test for checkBracketsTest method-----------------------------------
    
    /*This case checks the bracket check function returns true or
     false if it receives a string with the correct brackets*/

    @Test
    public void checkBracketsTestTrue()
    {
        boolean actual = App.checkBrackets("as(h)ghj(jhj)");
        assertTrue("The brackets wher opened and closed correctly but the mistake waas:", actual);
       
    }

    /*This case checks the bracket check function returns true or
     false if it receives a string with the correct brackets*/

    @Test
    public void checkBracketsTestTrue1()
    {
        boolean actual =  App.checkBrackets("(ghgh(hjhj(jhhj)))");
        assertTrue("The brackets wher opened and closed correctly but the mistake waas:", actual);       
    }

    /*This case checks the bracket check function returns true or
     false if it receives a string initially opened after it closed*/

    @Test
    public void checkBracketsTestFalseOpenedAfterItClosed()
    {
        boolean actual = App.checkBrackets(")df(df");
        assertFalse("Was initially opened after it closed but was considered right:", actual);
    }

    /*This case checks the bracket check function returns true or
     false if it receives a string alone closed the bracket */

    @Test
    public void checkBracketsTestAloneClosedTheBracket()
    {
        boolean actual = App.checkBrackets("df)df");
        assertFalse("Alone closed the bracket but it was considered right:", actual);
    }

    /*This case checks the bracket check function returns true or
     false if it receives a string alone closed the bracket */

    @Test
    public void checkBracketsTestAloneClosedTheBracket1()
    {
        boolean actual = App.checkBrackets(")dfdf");
        assertFalse("Alone closed the bracket but it was considered right:", actual);
    }

    /*This case checks the bracket check function returns true or
     false if it receives a string initially opened after it closed */

    @Test
    public void checkBracketsTestOpenedAfterItClosed()
    {
        boolean actual = App.checkBrackets("dfdf)(");
        assertFalse("Was initially opened after it closed but was considered right:", actual);          
    }

    //Test for resultReceipt method------------------------------------

    /*This case checks the expression value  function
     does the addition operation perform correctly*/

   @Test
    public void resultReceiptTestAddition() throws Exception {
        assertEquals("The addition operation was not performed correctly:", 7, App.resultReceipt("5+2"));
    }
    
     /*This case checks the expression value  function
     does the subtraction operation perform correctly*/
    @Test
    public void resultReceiptTestSubtraction() throws Exception {
        assertEquals("The subtraction operation was not performed correctly:", 3, App.resultReceipt("5-2"));
    }

     /*This case checks the expression value  function
     does the multiplication operation perform correctly*/
    
    @Test
    public void resultReceiptTestMultiplication() throws Exception {
        assertEquals("The multiplication  operation was not performed correctly:", 10, App.resultReceipt("5*2"));
    }

    /*This case checks the expression value  function
     does the separation operation perform correctly*/

    @Test
    public void resultReceiptTestSeparation() throws Exception {
        assertEquals("The separation operation was not performed correctly:", 3, App.resultReceipt("6/2"));
    }

    /*This case checks the expression value  function
     does the multiplication and addition operation perform correctly*/

    @Test
    public void resultReceiptTestMultiplicationAndAddition() throws Exception {
        assertEquals("Arithmetic operations are not performed correctly:", 9, App.resultReceipt("5+2*2"));
    }

    /*This case checks the expression value  function
     does the separation and addition operation perform correctly*/

    @Test
    public void resultReceiptTestseparationAndAddition() throws Exception {
        assertEquals("Arithmetic operations are not performed correctly:", 3, App.resultReceipt("5+2/2-3"));
    }

    //Test for result method----------------------------------------------

     /*This case checks  whether the end value of the expression  function
     is working correctlyto*/

    @Test  
    public void finalResultTestIncorrectlyCalculated1() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 35, App.result("17+6*(2+1)"));  
    } 

    /*This case checks  whether the end value of the expression  function
     is working correctlyto*/

    @Test  
    public void finalResultTestIncorrectlyCalculated2() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 29, App.result("17+(6-2)*(2+1)"));  
    } 

    /*This case checks  whether the end value of the expression  function
     is working correctlyto*/

    @Test  
    public void finalResultTestIncorrectlyCalculated3() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 20, App.result("17+(6+3)/(2+1)"));  
    } 
    
    /*This case checks  whether the end value of the expression  function
     is working correctlyto*/
     
    @Test  
    public void finalResultTestIncorrectlyCalculated4() {    
        assertEquals("The final result of the expression is incorrectly calculated:", 0, App.result("0/5"));  
    } 

     /*This case checks  whether the end value of the expression  function
     is working correctlyto get a number*/

    @Test  
    public void finalResultTestGettingNumber() {    
        assertEquals("Works wrong when getting a number:", 10, App.result("10"));  
    } 

    /*This case checks  whether the end value of the expression  function
     is working correctlyto get a blank string*/

    @Test  
    public void finalResultTestBlankString() {    
        assertEquals("Working wrong when getting a blank string:", 0, App.result(""));  
    } 
}
