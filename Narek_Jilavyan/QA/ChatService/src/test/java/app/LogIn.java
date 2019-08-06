package app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LogIn{
    private WebDriver driver;

    public LogIn(ChromeDriver driver) {
        this.driver = driver;
    }

    public MessagePage sign(String name) {
        driver.findElement(By.id("username")).sendKeys(name);
        driver.findElement(By.xpath("/html/body/form/div/input[2]")).click();
        return new MessagePage(driver);
    }
}
