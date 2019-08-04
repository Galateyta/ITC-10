package com.instigate.app;


import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class AppTest {

    private ChromeDriver driver;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();

    }

    @AfterClass
    public void exit() {
        driver.quit();
    }


    @Test(groups = "positive")
    public void signInTest() throws InterruptedException {

        driver.get("http://localhost:4000");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));

        String title = driver.getTitle();

        if (title.equals("Socket.io Chat")) {
            WebElement inputUserName = driver.findElementById("username");

            inputUserName.sendKeys("Mike");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();
            driver.manage().timeouts().implicitlyWait(1000, TimeUnit.SECONDS);
            driver.navigate().refresh();

        } else {
            Assert.fail("Error site not");

        }
    }

    @Test(groups = "negative")
    public void signInNegativeTest() throws InterruptedException {

        driver.get("http://localhost:4000");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));

        String title = driver.getTitle();

        if (title.equals("Socket.io Chat")) {
            WebElement inputUserName = driver.findElementById("username");

            inputUserName.sendKeys("");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();
            boolean isPresent = driver.findElements(By.xpath("/html/body/div")).size() > 0;

            Assert.assertFalse(isPresent, "Username must be required");

        }

    }

    @Test(groups = "negative")
    public void signInNegativeTsest() {

        driver.get("http://localhost:4000");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));

        String title = driver.getTitle();

        if (title.equals("Socket.io Chat")) {
            WebElement inputUserName = driver.findElementById("username");

            inputUserName.sendKeys("!@#");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();
            boolean isPresent = driver.findElements(By.xpath("/html/body/div")).size() > 0;

            Assert.assertFalse(isPresent, "Username is not valid");

        }

    }

    @BeforeGroups("negative-message")
    public void signInBefore() {

        driver.get("http://localhost:4000");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));

        String title = driver.getTitle();

        if (title.equals("Socket.io Chat")) {
            WebElement inputUserName = driver.findElementById("username");

            inputUserName.sendKeys("Mike");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();

        } else {
            Assert.fail("Error site not");

        }
    }

    @Test(groups = "negative-message")
    public void sendMessageNegativeTest() {

        WebElement inputMessage = driver.findElementById("privateText");
        inputMessage.sendKeys("hellow");
        driver.findElementByXPath("/html/body/div/div/div[3]/div[2]/div/button").click();

        WebElement ul = driver.findElementById("messages");
        List<WebElement> links = ul.findElements(By.tagName("li"));

        Assert.assertEquals(0, links.size(), "Unanswered message should not be sent");

    }

    @Test(groups = "negative-message")
    public void sendEmptyMessageNegativeTest() {

        WebElement inputMessage = driver.findElementById("privateText");
        inputMessage.sendKeys("");
        driver.findElementByXPath("/html/body/div/div/div[3]/div[2]/div/button").click();

        inputMessage.sendKeys("");
        driver.findElementByXPath("/html/body/div/div/div[3]/div[2]/div/button").click();
        WebElement ul = driver.findElementById("messages");
        List<WebElement> links = ul.findElements(By.tagName("li"));

        Assert.assertEquals(0, links.size(), "Empty message should not send");

    }

    @Test(groups = "negative-chat")
    public void addUser() {
        driver.get("http://localhost:4000");
        WebDriverWait wait = new WebDriverWait(driver, 10);

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));
        String title = driver.getTitle();
        int messagesCount = 0;

        if (title.equals("Socket.io Chat")) {

            WebElement inputUserName = driver.findElementById("username");
            inputUserName.sendKeys("Arthur");

            driver.findElementByXPath("/html/body/form/div/input[2]").click();
            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));

            driver.navigate().refresh();
            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/form")));

            WebElement inputUserNameMike = driver.findElementById("username");
            inputUserNameMike.sendKeys("Mike");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();
            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));


            driver.findElementById("Jhon").click();
            WebElement ul = driver.findElementById("messages");
            List<WebElement> links = ul.findElements(By.tagName("li"));
            messagesCount = links.size();

            driver.findElementById("Arthur").click();

        } else {

            Assert.fail("Error page  not found");

        }

        ((JavascriptExecutor) driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());

        driver.switchTo().window(tabs.get(1));
        driver.get("http://localhost:4000");

        String title1 = driver.getTitle();

        if (title1.equals("Socket.io Chat")) {
            WebElement inputUserName = driver.findElementById("username");

            inputUserName.sendKeys("Jhon");
            driver.findElementByXPath("/html/body/form/div/input[2]").click();

            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));

            driver.findElementById("Mike").click();
            WebElement inputMessage = driver.findElementById("privateText");
            inputMessage.sendKeys("Hellow Mike");
            driver.findElementByXPath("/html/body/div/div/div[3]/div[2]/div/button").click();


        } else {
            Assert.fail("Error site not");

        }

        driver.switchTo().window(tabs.get(0));
        driver.findElementById("Jhon").click();

        WebElement ul = driver.findElementById("messages");
        List<WebElement> links = ul.findElements(By.tagName("li"));

        Assert.assertNotEquals(messagesCount, links.size(), "Messages count must be not equals");


    }
}


