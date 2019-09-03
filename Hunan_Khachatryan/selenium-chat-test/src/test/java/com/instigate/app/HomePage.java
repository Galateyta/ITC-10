package com.instigate.app;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Reporter;

import java.io.File;
import java.io.IOException;

import java.util.List;

public class HomePage {

    private WebDriver driver;
    By sendPost = By.xpath("/html/body/div/div/div[3]/div[3]/div/button");
    By send = By.xpath("/html/body/div/div/div[3]/div[2]/div/button");
    By chatClass = By.xpath("/html/body/div");
    By privateText = By.id("privateText");
    By id = By.id("publicMessages");
    By friends = By.id("friends");
    By message = By.id("messages");
    By posts = By.id("publicText");
    By name = By.id("uName");
    By li = By.tagName("li");

    public HomePage(WebDriver driver) {
        this.driver = driver;

    }


    public String getUserName() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(chatClass));
        return driver.findElement(name).getText();
    }

    public String getFriendName(String name) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id(name)));

        return driver.findElement(By.id(name)).getText();
    }

    public void sendMessage(String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(privateText));
        driver.findElement(privateText).sendKeys(message);
        driver.findElement(send).click();

    }

    public void sendMessageFrom(String user, String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(friends));
        driver.findElement(By.id(user)).click();
        sendMessage(message);

    }

    public String getMessage(String user) {

        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(friends));
        driver.findElement(By.id(user)).click();
        WebElement ul = driver.findElement(message);
        List<WebElement> links = ul.findElements(li);
        return links.get(links.size() - 1).getText();

    }

    public void addPost(String post) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(posts));
        driver.findElement(posts).sendKeys(post);
        driver.findElement(sendPost).click();

    }

    public String getPost() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(id));
        WebElement ul = driver.findElement(id);
        List<WebElement> links = ul.findElements(li);
        return links.get(links.size() - 1).getText();

    }

    public String getTitle() {
        return driver.getTitle();
    }

    public  void captureScreenShot() {

        File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        String path = "src/main/resources/screenshots/" + System.currentTimeMillis() + ".png";
        try {
            FileUtils.copyFile(src, new File(path));
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        String filePath = "<img src=/ file://" + path + "/>";
        Reporter.log(filePath);
    }

}
