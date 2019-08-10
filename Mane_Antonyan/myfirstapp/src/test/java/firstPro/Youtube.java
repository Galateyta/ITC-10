package firstPro;

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

import java.util.ArrayList;
import java.util.List;

public class Youtube {
    final String signInText = "/html/body/form/div/h2";
    final String joinButten = "/html/body/form/div/input[2]";
    final String input = "//*[@id=\"username\"]";
    final String friendText = "/html/body/div/div/div[1]/div[1]/h3";
    final String messInput = "//*[@id=\"publicText\"]";
    final String sendMesageButton = "/html/body/div/div/div[3]/div[3]/div/button";
    final String publicMessageListId = "publicMessages";
    final String validUser = "Kolibri";
    final String publicChatText = "/html/body/div/div/div[1]/div[3]/h3";

    static WebDriver driver;
    DesiredCapabilities desiredCapabilities;

    public WebDriver initWebDriver() {
        driver = new ChromeDriver();
        return driver;
    }

    public void waitToElement(int second, String element){
        WebDriverWait wait = new WebDriverWait(driver, second);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(element)));
    }

    @BeforeClass
    public void createWebDriver() {
        System.setProperty("webdriver.chrome.driver", "/home/mary/Desktop/kolibri/chrome/chromedriver");
        driver = initWebDriver();
    }

    @BeforeMethod
    public void getDriver() {
        driver.get("http://localhost:4000/");
        waitToElement(7, signInText);
    }

    @AfterSuite
    public void quitDriver() {
        driver.quit();
    }

    @Test
    public void testJoinButtonExist() {
        WebElement joinText = driver.findElement(By.xpath(joinButten));
        Assert.assertEquals(joinText.getAttribute("value"), "Join", "Annormal");
    }

    @Test
    public void testLoginPageExist() {
        WebElement loginText = driver.findElement(By.xpath(signInText));
        Assert.assertEquals(loginText.getText(), "Sign In", "Annormal");
    }

    @Test
    public void testLoginPagePublicChatExist() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys("Mane");
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        joinButton.click();

        WebElement pub = driver.findElement(By.xpath(publicChatText));
        Assert.assertEquals(pub.getText(), "Posts", "Public chat not exist!");
    }

    @Test
    public void incorrectNameInput() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys("k");
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        try {
            joinButton.click();
            try {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                System.out.println("Alert data: " + alertText);
                alert.accept();
            } catch (NoAlertPresentException e) {
                e.printStackTrace();
            }
        } catch (UnhandledAlertException f) {
            System.out.println("Bad case");
        }
        getDriver();
    }

    @Test
    public void correctNameInput() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys("Mane");
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        try {
            joinButton.click();
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
        WebElement chatPage = driver.findElement(By.xpath(friendText));
        Assert.assertTrue(chatPage.isDisplayed(), "Sign up page does not appeared");
    }

    @Test
    public void correctMessageSent() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys("Mane");
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        joinButton.click();
        WebElement ul = driver.findElement(By.id(publicMessageListId));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        int before = links.size();

        WebElement chatPage = driver.findElement(By.xpath(friendText));
        Assert.assertTrue(chatPage.isDisplayed(), "Sign up page does not appeared");
        WebElement messInputElem = driver.findElement(By.xpath(messInput));
        messInputElem.sendKeys("Hello world!");
        WebElement sendMessage = driver.findElement(By.xpath(sendMesageButton));
        sendMessage.click();
        ul = driver.findElement(By.id(publicMessageListId));
        links = ul.findElements(By.tagName("li"));
        int after = links.size();
        Assert.assertNotEquals(before, after,"Message does not send");

        sleepSpecificTime(5);
    }

    @Test
    public void correctMessageSentAndPrint() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys("Mane");
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        joinButton.click();
        WebElement ul = driver.findElement(By.id(publicMessageListId));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        int before = links.size();

        WebElement chatPage = driver.findElement(By.xpath(friendText));
        Assert.assertTrue(chatPage.isDisplayed(), "Sign up page does not appeared");
        WebElement messInputElem = driver.findElement(By.xpath(messInput));
        messInputElem.sendKeys("Hello world!");
        WebElement sendMessage = driver.findElement(By.xpath(sendMesageButton));
        sendMessage.click();
        ul = driver.findElement(By.id(publicMessageListId));
        links = ul.findElements(By.tagName("li"));
        int after = links.size();
        Assert.assertNotEquals(before, after,"Message does not send");

        final String printMessage = links.get(before).getText();
        Assert.assertEquals(printMessage, "Mane: Hello world!", "Bad message print!");

        sleepSpecificTime(5);
    }

    @Test
    public void incorrectMessageSentAndPrint() {
        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys(validUser);
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        joinButton.click();
        WebElement ul = driver.findElement(By.id(publicMessageListId));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        int before = links.size();

        WebElement chatPage = driver.findElement(By.xpath(friendText));
        Assert.assertTrue(chatPage.isDisplayed(), "Sign up page does not appeared");
        WebElement messInputElem = driver.findElement(By.xpath(messInput));
        messInputElem.sendKeys("");
        WebElement sendMessage = driver.findElement(By.xpath(sendMesageButton));
        sendMessage.click();
        ul = driver.findElement(By.id(publicMessageListId));
        links = ul.findElements(By.tagName("li"));
        int after = links.size();
        Assert.assertNotEquals(before, after,"Message does not send");

        final String printMessage = links.get(before).getText();
        Assert.assertEquals(printMessage, validUser + ":", "Bad message print!");

        sleepSpecificTime(5);
    }

    @Test
    public void paralelWorkTest() {
        WebDriver driver2 = new ChromeDriver();
        driver2.get("http://localhost:4000/");
        sleepSpecificTime(2);

        WebElement inputElem = driver.findElement(By.xpath(input));
        inputElem.sendKeys(validUser);
        WebElement joinButton = driver.findElement(By.xpath(joinButten));
        joinButton.click();

        inputElem = driver2.findElement(By.xpath(input));
        inputElem.sendKeys("Mane");
        joinButton = driver2.findElement(By.xpath(joinButten));
        joinButton.click();

        WebElement ul = driver2.findElement(By.id(publicMessageListId));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        int before = links.size();

        WebElement chatPage = driver.findElement(By.xpath(friendText));
        Assert.assertTrue(chatPage.isDisplayed(), "Sign up page does not appeared");
        WebElement messInputElem = driver.findElement(By.xpath(messInput));
        messInputElem.sendKeys("hii");
        WebElement sendMessage = driver.findElement(By.xpath(sendMesageButton));
        sendMessage.click();
        ul = driver2.findElement(By.id(publicMessageListId));
        links = ul.findElements(By.tagName("li"));
        int after = links.size();
        Assert.assertNotEquals(before, after,"Message does not send");

        final String printMessage = links.get(before).getText();
        Assert.assertEquals(printMessage, validUser + ": hii", "Bad message print!");
    }

    public static void sleepSpecificTime(int second) {
        try {
            Thread.sleep(second*1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}