import org.junit.AfterClass;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ForgotPasswordPageChromeTests {
    static WebDriver driver = new ChromeDriver();
    DesiredCapabilities desiredCapabilities;

    public WebDriver initWebDriver() {
        if (driver == null) {
            desiredCapabilities = new DesiredCapabilities();
            desiredCapabilities.setCapability(CapabilityType.UNEXPECTED_ALERT_BEHAVIOUR, UnexpectedAlertBehaviour.IGNORE);
            driver = new ChromeDriver(desiredCapabilities);
        }
        return driver;
    }

    @BeforeMethod
    public void createWebDriver() {
        System.setProperty("webdriver.chrome.driver", "/usr/lib/chromium-browser/chromedriver");
        driver = initWebDriver();
        driver.get("http://localhost:3000/reset");
        sleepSpecificTime(5);
    }

    @AfterClass
    public void quitDriver() {
        driver.quit();
    }

    @Test
    public void verifyForgotPasswordPageStructure() {
        WebElement forgotPasswordText = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[1]/h2"));
        WebElement emailField = driver.findElement(By.xpath("//*[@id=\"email\"]"));
        WebElement resetButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button"));
        Assert.assertEquals(forgotPasswordText.getText(), "Forgot password", "Not equals");
        Assert.assertTrue(emailField.isDisplayed(), "Email field does not exists");
        Assert.assertTrue(resetButton.isDisplayed(), "Reset button does not exists");
    }

    @Test
    public void verifyInvalidEmailAddressFunctionality() {
        WebElement forgotPasswordText = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[1]/h2"));
        WebElement emailField = driver.findElement(By.xpath("//*[@id=\"email\"]"));
        WebElement resetButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button"));

        emailField.clear();
        emailField.sendKeys("aaaa@mail.ru");

        try {
            resetButton.click();
        } catch (UnhandledAlertException f) {
            try {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                System.out.println("Alert data: " + alertText);
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }

        sleepSpecificTime(5);
        Assert.assertTrue(forgotPasswordText.isDisplayed(), "Page change after inputing invalid email address!!!");
    }

    @Test
    public void verifyValidEmailAddressFunctionality() {
        WebElement emailField = driver.findElement(By.xpath("//*[@id=\"email\"]"));
        WebElement resetButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button"));
        emailField.clear();
        emailField.sendKeys("arthur.aghajanyan.1994@mail.ru");
        try {
            resetButton.click();
        } catch (UnhandledAlertException f) {
            try {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                System.out.println("Alert data: " + alertText);
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }
        sleepSpecificTime(5);
        WebElement signInPageElement = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[1]/div[1]/h2"));
        Assert.assertTrue(signInPageElement.isDisplayed(), "Sign up page does not appeared");
    }

    public static void sleepSpecificTime(int second) {
        try {
            Thread.sleep(second*1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
