package com.mycompany.app;

import static org.junit.Assert.*;

import org.junit.Test;


public class AppTest 
{
    //Test for checkBracketsTest method-----------------------------------
    
    @Test
    public void checkBracketsTest()
    {
        boolean actual = App.checkBrackets("as(h)ghj(jhj)");
        assertTrue(actual);
       
    }
    @Test
    public void checkBracketsTest1()
    {
        boolean actual =  App.checkBrackets("(ghgh(hjhj(jhhj)))");
        assertTrue(actual);       
    }
    @Test
    public void checkBracketsTest2()
    {
        boolean actual = App.checkBrackets(")df(df");
        assertFalse(actual);
    }
    @Test
    public void checkBracketsTest3()
    {
        boolean actual = App.checkBrackets("df)df");
        assertFalse(actual);
    }
    @Test
    public void checkBracketsTest4()
    {
        boolean actual = App.checkBrackets(")dfdf");
        assertFalse(actual);
    }
    @Test
    public void checkBracketsTest5()
    {
        boolean actual = App.checkBrackets("dfdf)(");
        assertFalse(actual);          
    }

    //Test for resultReceipt method------------------------------------

    /*@Test
    public void resultReceiptTest1() throws Exception {
        int result = App.resultReceipt("5+2");
        assertThat(result, is(7));
    }

    @Test
    public void resultReceiptTest2() throws Exception {
        int result = App.resultReceipt("5-2");
        assertThat(result, is(3));
    }

    @Test
    public void resultReceiptTest2() throws Exception {
        int result = App.resultReceipt("5*2");
        assertThat(result, is(10));
    }

    @Test
    public void resultReceiptTest3() throws Exception {
        int result = App.resultReceipt("6/2");
        assertThat(result, is(3));
    }

    @Test
    public void resultReceiptTest4() throws Exception {
        int result = App.resultReceipt("5+2*2");
        assertThat(result, is(9));
    }

    @Test
    public void resultReceiptTest5() throws Exception {
        int result = App.resultReceipt("5+2/2-3");
        assertThat(result, is(3));
    }*/

    //Test for result method----------------------------------------------

    @Test  
    public void resultTest1() {    
        assertEquals(35, App.result("17+6*(2+1)"));  
    } 

    @Test  
    public void resultTest2() {    
        assertEquals(29, App.result("17+(6-2)*(2+1)"));  
    } 

    @Test  
    public void resultTest3() {    
        assertEquals(20, App.result("17+(6+3)/(2+1)"));  
    } 

   /* @Test  
    public void resultTest4() {    
        assertEquals(7, App.result("(15/5)*2+1"));  
    } */
    
    @Test  
    public void resultTest5() {    
        assertEquals(0, App.result("0/5"));  
    } 

    @Test  
    public void resultTest6() {    
        assertEquals(10, App.result("10"));  
    } 

    @Test  
    public void resultTest7() {    
        assertEquals(0, App.result(""));  
    } 
}
