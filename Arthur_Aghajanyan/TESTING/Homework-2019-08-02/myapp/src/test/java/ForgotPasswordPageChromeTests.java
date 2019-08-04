import org.junit.AfterClass;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ForgotPasswordPageChromeTests {
    final String forgotPasswordPageText = "//*[@id=\"root\"]/div/div/div/form/div/div/div[1]/h2";
    final String forgotPasswordPageResetButton = "//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button";
    final String forgotPasswordPageEmailInput = "//*[@id=\"email\"]";
    final String correctEmailAddres = "arthur.aghajanyan.1994@mail.ru";
    final String incorrectEmailAddres = "aaaa@mail.ru";
    final String signInPageText = "//*[@id=\"root\"]/div/div/div/form/div/div[1]/div[1]/h2";

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
    public void waitToElement(int second, String element){
        WebDriverWait wait = new WebDriverWait(driver, second);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(element)));
    }
    @BeforeMethod
    public void createWebDriver() {
        System.setProperty("webdriver.chrome.driver", "/usr/lib/chromium-browser/chromedriver");
        driver = initWebDriver();
        driver.get("http://localhost:3000/reset");
        waitToElement(7, forgotPasswordPageText);
    }

    @AfterSuite
    public void quitDriver() {
        driver.quit();
    }
    @Test
    public void verifyForgotPasswordPageText(){
        System.out.println("verifyForgotPasswordPageText");
        WebElement forgotPasswordText = driver.findElement(By.xpath(forgotPasswordPageText));
        Assert.assertEquals(forgotPasswordText.getText(), "Forgot password", "Not equals");
    }

    @Test
    public void verifyForgotPasswordPageResetButton(){
        System.out.println("verifyForgotPasswordPageResetButton");
        WebElement resetButton = driver.findElement(By.xpath(forgotPasswordPageResetButton));
        Assert.assertTrue(resetButton.isDisplayed(), "Reset button does not exists");
    }

    @Test
    public void verifyForgotPasswordPageEmailField(){
        System.out.println("verifyForgotPasswordPageEmailField");
        WebElement emailField = driver.findElement(By.xpath(forgotPasswordPageEmailInput));
        Assert.assertTrue(emailField.isDisplayed(), "Email field does not exists");
    }

    @Test
    public void verifyInvalidEmailAddressFunctionality() {
        WebElement forgotPasswordText = driver.findElement(By.xpath(forgotPasswordPageText));
        WebElement emailField = driver.findElement(By.xpath(forgotPasswordPageEmailInput));
        WebElement resetButton = driver.findElement(By.xpath(forgotPasswordPageResetButton));

        emailField.clear();
        emailField.sendKeys(incorrectEmailAddres);

        try {
            resetButton.click();
            sleepSpecificTime(5);
        } catch (UnhandledAlertException f) {
            try {
                Alert alert = driver.switchTo().alert();
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        }
        Assert.assertTrue(forgotPasswordText.isDisplayed(), "Page change after inputing invalid email address!!!");
    }

    @Test
    public void verifyValidEmailAddressFunctionality() {
        WebElement emailField = driver.findElement(By.xpath(forgotPasswordPageEmailInput));
        WebElement resetButton = driver.findElement(By.xpath(forgotPasswordPageResetButton));
        emailField.clear();
        emailField.sendKeys(correctEmailAddres);
        try {
            resetButton.click();
            waitToElement(7, signInPageText);
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
        WebElement signInPageElement = driver.findElement(By.xpath(signInPageText));
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
