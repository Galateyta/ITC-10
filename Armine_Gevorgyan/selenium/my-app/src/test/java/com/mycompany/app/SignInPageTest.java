package com.mycompany.app;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;



public class SignInPageTest {

    SignIn signIn = new SignIn();

    private WebDriver driver;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();
    }

    @BeforeMethod
    public void open() {
        signIn.goToPage(driver);
    }

    @Test
    public void writeEmail() throws InterruptedException {
        long start = System.currentTimeMillis();
        String currentURL;
        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String email = signIn.getEmailValue(driver);
        Thread.sleep(2000);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "http://localhost:3000/home", "writeEmail");
    }

    @Test
    public void writeEmailEmpty() throws InterruptedException {
        long start = System.currentTimeMillis();
        String currentURL;
        signIn.writeEmpatyEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String email = signIn.getEmailValue(driver);
        Thread.sleep(2000);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "http://localhost:3000/", "writeEmailEmpty");
    }

    @Test
    public void writePassword() throws InterruptedException {
        long start = System.currentTimeMillis();
        String currentURL;
        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String pass = signIn.getPasswordValue(driver);
        Thread.sleep(2000);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "http://localhost:3000/", "writePassword");
    }


    @Test
    public void writePasswordEmpty() throws InterruptedException {
        long start = System.currentTimeMillis();
        String currentURL;
        signIn.writeEmail(driver);
        signIn.writeEmpatyPassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String pass = signIn.getPasswordValue(driver);
        Thread.sleep(2000);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "http://localhost:3000/", "writePasswordEmpty");
    }

    @Test
    public void writeEmpatyPasswordAndEmpatyEmpty() throws InterruptedException {
        long start = System.currentTimeMillis();
        String currentURL ;
        signIn.writeEmpatyEmail(driver);
        signIn.writeEmpatyPassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        Thread.sleep(2000);
        currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "http://localhost:3000/", "writeEmpatyPasswordAndEmpatyEmpty");
    }
    @Test
    public void writePasswordFeild() throws InterruptedException {
        long start = System.currentTimeMillis();
        signIn.writeEmail(driver);
        signIn.writeFeildPassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        Thread.sleep(2000);

        String alert = driver.switchTo().alert().getText();
        Assert.assertEquals(alert, "Password is not valid", "writePasswordFeild");
    }

    @Test
    public void writeEmailFeild() throws InterruptedException {
        long start = System.currentTimeMillis();
        By email = By.xpath("//*[@id=\"email\"]");
        String currentURL ;
        signIn.writeFeildEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        Thread.sleep(2000);
        JavascriptExecutor js = (JavascriptExecutor)driver;
        WebElement field = By.xpath("//*[@id=\"email\"]").findElement(driver);
        String message = (String)js.executeScript("return arguments[0].validationMessage;", field);
        Assert.assertEquals(message, "Please include an '@' in the email address. 'test.test' is missing an '@'.", "writeEmailFeild");
    }

    @Test
    public void userNotFound() throws InterruptedException {
        signIn.writeUnSigninEmail(driver);
        signIn.writeFeildPassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        Thread.sleep(2000);

        String alert = driver.switchTo().alert().getText();
        Assert.assertEquals(alert, "User not found", "userNotFound");
    }

    @AfterMethod
    public void exit(){
        driver.quit();
    }

}
