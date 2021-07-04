package com.mycompany.app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SignIn  {
    private WebDriver driver;

    By email = By.xpath("//*[@id=\"email\"]");
    By password = By.xpath("//*[@id=\"password\"]");
    By signInBtn = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/button");
    By remember = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[2]/input");


    public void goToPage(WebDriver driver){
        driver.get("http://localhost:3000/");
    }

    public String getEmailValue(WebDriver driver) {
        return driver.findElement(email).getAttribute("value");
    }

    public String getPasswordValue(WebDriver driver) {
        return driver.findElement(password).getAttribute("value");
    }

    public void writeEmail(WebDriver driver) {
        WebElement text = driver.findElement(email);
        text.sendKeys("arm.gevorgyan94@gmail.com");
    }

    public void writeEmpatyEmail(WebDriver driver) {
        WebElement text = driver.findElement(email);
        text.sendKeys("");
    }

    public void writeUnSigninEmail(WebDriver driver) {
        WebElement text = driver.findElement(email);
        text.sendKeys("test.test@inbox.ru");
    }

    public void writeFeildEmail(WebDriver driver) {
        WebElement text = driver.findElement(email);
        text.sendKeys("test.test");
    }

    public void writeEmpatyPassword(WebDriver driver) {
        WebElement text = driver.findElement(password);
        text.sendKeys("");
    }

    public void writePassword(WebDriver driver) {
        WebElement text = driver.findElement(password);
        text.sendKeys("ca6d691d-34ca-4f4e-a395-5aa738e05ce7");
    }

    public void writeFeildPassword(WebDriver driver) {
        WebElement text = driver.findElement(password);
        text.sendKeys("ca");
    }

    public void signIn(WebDriver driver) {
        WebElement write = driver.findElement(signInBtn);
        write.click();
    }

    public void rememberMe(WebDriver driver) {
        WebElement write = driver.findElement(remember);
       // write.click();
        Boolean dropdownPresent = driver.findElement(remember).isDisplayed();
        System.out.println(dropdownPresent);
    }
}
