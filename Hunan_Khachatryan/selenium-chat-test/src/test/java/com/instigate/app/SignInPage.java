package com.instigate.app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SignInPage {
    private WebDriver driver;

    public SignInPage(ChromeDriver driver) {

        this.driver = driver;
    }

    public HomePage sign(String userName) {
        driver.findElement(By.id("username")).sendKeys(userName);
        driver.findElement(By.xpath("/html/body/form/div/input[2]")).click();
        return new HomePage(driver);

    }
}
