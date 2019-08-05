package helperFunctions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class HelperFunctions {
    public static void waitToElement(WebDriver driver, int second, String element){
        WebDriverWait wait = new WebDriverWait(driver, second);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(element)));
    }

    public static void sleepSpecificTime(int second) {
        try {
            Thread.sleep(second*1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static <T> T getInstanceForSpecificClass(Class<T> currentClass) {
        Method method;
        try {
            method = currentClass.getDeclaredMethod("getInstance");
            method.setAccessible(true);
            return (T) method.invoke(null);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        return null;
    }

}
