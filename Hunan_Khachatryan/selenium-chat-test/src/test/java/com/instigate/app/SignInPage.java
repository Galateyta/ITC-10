package com.instigate.app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

import java.awt.*;

public class SignInPage {
    private WebDriver driver;

    public SignInPage(WebDriver driver) {

        this.driver = driver;
        PageFactory.initElements(driver, this);

    }
    @FindBy(xpath = "/html/body/form/div/input[2]")
    private WebElement signIn;

    @FindBy(id = "username")
    private  WebElement username;

    public HomePage sign(String userName) {
        username.sendKeys(userName);
        signIn.click();
        return new HomePage(driver);

    }
}
