package am.instigate.app;


import org.junit.Before;
import org.testng.Assert;
import org.testng.IAnnotationTransformer;
import org.testng.annotations.*;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class TestNg {

    @BeforeGroups(groups = "positive")
    public  void beforePositiveGroup() {

        System.out.println("start testing before positive group");
    }

    @Before
    public  void before() {
        System.out.println("start testing before ");
    }


    @Test(groups = "positive")
    public void testSum()  {
        Calculator calculator = new Calculator();
        Assert.assertEquals(7.0, calculator.doTheShuntingYard("((5 + 2) * 2)/2"));
    }
    @Test(groups = "negative")
    public void testSum1()  {
        Calculator calculator = new Calculator();
        Assert.assertNotEquals(6.0, calculator.doTheShuntingYard("((5 + 2) * 2)/2"));
    }

    @Parameters({ "param" })
    @Test(groups = "positive")
    public void prameterTestThree( String param) {
        System.out.println("Param value is:  " + param );
    }
}

class AnnotgationTransformer implements IAnnotationTransformer {

    @Override
    public void transform(ITestAnnotation annotation, Class aClass, Constructor constructor, Method method) {
        if ("testSum".equals(method.getName())) {
            annotation.setInvocationCount(15);
        }
    }
}
