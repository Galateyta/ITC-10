import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Properties;

public class AndroidAppium {
    WebDriver driver;

//    File appDir = new File("/Users/Steve/Development/SampleApps");
//    File app = new File(appDir, "Flipkart.apk");
//    DesiredCapabilities cap = new DesiredCapabilities();
    DesiredCapabilities cap = new DesiredCapabilities();

    @Before
    public void setUp() throws MalformedURLException {
        // Created object of DesiredCapabilities class.
        System.out.println("11111111111");

        cap.setCapability("deviceName", "SM-J600F");
        System.out.println("11111111111");
        cap.setCapability("platformName", "Android");
        cap.setCapability("appPackage", "com.android.chrome");
        cap.setCapability("appActivity", "com.google.android.apps.chrome.Main");
        System.out.println("1122222111111");

        try{
            driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub/"), cap);
        }catch (WebDriverException ex){
            ex.fillInStackTrace();
        }
        System.out.println("11433333");
    }

    @Test
    public void firstTest() {
        System.out.println("Ashxateci");
        driver.findElement(By.id("btn_setup")).click();
    }
}