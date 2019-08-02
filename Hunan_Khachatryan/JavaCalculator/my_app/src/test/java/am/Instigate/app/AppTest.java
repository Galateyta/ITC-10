package am.Instigate.app;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.IOException;

import static org.junit.Assert.*;


public class AppTest {

    @Rule
    public ExpectedException exeption = ExpectedException.none();

    //test that checks the bracket balance function
    @Test
    public void isBalansedTest() {
        App test = new App();
        assertTrue("Paranthes is not balanced ", test.areParanthesisBalanced("( 15 + 4  ) * 5"));


    }

    //test that checks the bracket balance function
    @Test
    public void isBalansedTestShuldReturnFalse() {
        App test = new App();
        assertFalse("Paranthes is balanced ", test.areParanthesisBalanced("15)( + 4 * 15"));

    }


    //a test that tests the function of performing mathematical operations
    @Test
    public void optionPlusTrue() {
        App test = new App();
        assertEquals("Operation  is false ", 9.0, test.operation(4, 5, '+'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionPlusFalse() {
        App test = new App();
        assertNotEquals("Operation  is true ", 7.0, test.operation(8, 5, '+'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionMinusTrue() {
        App test = new App();
        assertEquals("Operation  is false ", -1.0, test.operation(4, 5, '-'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionMinuFalse() {
        App test = new App();
        assertNotEquals("Operation  is true ", 8.0, test.operation(14, 5, '-'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionMultiplyTrue() {
        App test = new App();
        assertEquals("Operation  is false ", 20.0, test.operation(4, 5, '*'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionMultiplyFalse() {
        App test = new App();
        assertNotEquals("Operation  is true ", 9.0, test.operation(14, 5, '*'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionDivTrue() {
        App test = new App();
        assertEquals("Operation  is false ", 8.0, test.operation(40, 5, '/'), 0.0);

    }

    //a test that tests the function of performing mathematical operations
    @Test
    public void optionDivFalse() {
        App test = new App();
        assertNotEquals("Operation  is true ", 9.0, test.operation(14, 5, '/'), 0.0);

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityPlusTrue() {
        App test = new App();
        assertEquals("Priority  is false ", 1, test.priority('+'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityPlusFalse() {
        App test = new App();
        assertNotEquals("Priority  is true ", 2, test.priority('+'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityMinusTrue() {
        App test = new App();
        assertEquals("Priority  is false ", 1, test.priority('-'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityMinusFalse() {
        App test = new App();
        assertNotEquals("Priority  is true ", 2, test.priority('-'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityDivTrue() {
        App test = new App();
        assertEquals("Priority  is false ", 2, test.priority('/'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityDivFalse() {
        App test = new App();
        assertNotEquals("Priority  is true ", 1, test.priority('/'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityMultiplyTrue() {
        App test = new App();
        assertEquals("Priority  is false ", 2, test.priority('*'));

    }

    //a test that checks the priority of the operators
    @Test
    public void priorityMultiplyFalse() {
        App test = new App();
        assertNotEquals("Priority  is true ", 1, test.priority('*'));

    }

    //test that checks the expression calculation function
    @Test
    public void evalExpressionTrue() {
        App test = new App();
        assertEquals("Evaluate expression is false ", 60.0, test.evalExpression("( 10 + 5 ) * 4"), 0.0);

    }



    //a test that checks the write function of a file
    @Test
    public void writeInFile() throws IOException {
        App test = new App();
        test.writeInFile("src/resources/file1.txt", "4 + 5");

    }

    //a test that checks the write function of a file
    @Test
    public void writeInFileWidthExeption() throws IOException {
        App test = new App();
        exeption.expect(IOException.class);
        test.writeInFile("", "4 + 5");

    }

    //a test that checks the read function of a file
    @Test
    public void readFromFile() throws IOException {
        App test = new App();
        System.out.println("a" + test.readFile("src/resources/file1.txt") + "a");
        assertEquals("Can not readFromFile  ", "4 + 5", test.readFile("src/resources/file1.txt"));

    }

    //a test that checks the read function of a file
    @Test
    public void readFromFileWidthExeption() throws IOException {
        App test = new App();
        exeption.expect(IOException.class);
        assertEquals("Can readFromFile ", "4+5", test.readFile(""));

    }

    @Test
    public void readAFromFileWidthExeption() throws IllegalArgumentException, IOException {
        App test = new App();

        exeption.expect(IllegalArgumentException.class);
        exeption.expectMessage("In expression the paranthes is not balanced");
        test.readAndWriteInFile("src/resources/file.txt");


    }
}
