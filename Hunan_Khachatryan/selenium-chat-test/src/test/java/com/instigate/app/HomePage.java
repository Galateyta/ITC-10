package com.instigate.app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Collection;
import java.util.List;

public class HomePage {

    private WebDriver driver;

    public HomePage(WebDriver driver) {
        this.driver = driver;

    }

    public String getUserName() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("/html/body/div")));
        return driver.findElement(By.id("uName")).getText();
    }

    public String getFriendName(String name) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id(name)));

        return driver.findElement(By.id(name)).getText();
    }

    public void sendMessage(String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("privateText")));
        driver.findElement(By.id("privateText")).sendKeys(message);
        driver.findElement(By.xpath("/html/body/div/div/div[3]/div[2]/div/button")).click();

    }

    public void sendMessageFrom(String user, String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));
        driver.findElement(By.id(user)).click();
        sendMessage(message);

    }

    public String getMessage(String user) {

        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));
        driver.findElement(By.id(user)).click();
        WebElement ul = driver.findElement(By.id("messages"));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        System.out.println("ssss" + links.get(links.size()-1).getText() +"ssss" );
        return links.get(links.size()-1).getText();

    }

    public  void  addPost (String post) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("publicText")));
        driver.findElement(By.id("publicText")).sendKeys(post);
        driver.findElement(By.xpath("/html/body/div/div/div[3]/div[3]/div/button")).click();

    }

    public String getPost() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("publicMessages")));
        WebElement ul = driver.findElement(By.id("publicMessages"));
        List<WebElement> links = ul.findElements(By.tagName("li"));
        return links.get(links.size()-1).getText();

    }

    public String getTitle() {
        return driver.getTitle();
    }
}
