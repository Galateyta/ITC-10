package am.Instigate.app;

import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.*;

/**
 * Unit test for simple App.
 */
public class AppTest 
{
    /**
     * Rigorous Test :-)
     */
    @Test
    public void isBalansedTest() {
        App test = new App();
        assertTrue(test.areParanthesisBalanced("( 15 + 4 ) * 5"));


    }
    @Test
    public void isBalansedTestShuldReturnFalse() {
        App test = new App();
        assertFalse(test.areParanthesisBalanced("15)( + 4 * 15"));


    }

    @Test
    public void evalExpressionTrue() {
        App test = new App();
        assertEquals(60.0, test.evalExpression("( 10 + 5 ) * 4"),0.0);

    }
    @Test
    public void evalExpressionFalse() {
        App test = new App();
        assertNotEquals(15.0, test.evalExpression("10 + 5 * 4"),0.0);

    }
    @Test
    public void optionPlusTrue() {
        App test = new App();
        assertEquals(9.0, test.operation(4,5,'+'),0.0);

    }
    @Test
    public void optionPlusFalse() {
        App test = new App();
        assertNotEquals(7.0, test.operation(8,5,'+'),0.0);

    }
    @Test
    public void optionMinusTrue() {
        App test = new App();
        assertEquals(-1.0, test.operation(4,5,'-'),0.0);

    }
    @Test
    public void optionMinuFalse() {
        App test = new App();
        assertEquals(9.0, test.operation(14,5,'-'),0.0);

    }
    @Test
    public void evalExpressionAndWrite() throws IOException {
        App test = new App();
        assertTrue(test.readAndWriteInFile("src/resources/file.txt"));

    }


}
