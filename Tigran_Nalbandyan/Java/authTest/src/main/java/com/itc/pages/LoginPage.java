package com.itc.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class LoginPage {
    private WebDriver driver;

    private String url = "http://localhost:3000/";
    private By signUpButtonPath = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/a/button");
    private By forgotButtonPath = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[2]/a/button");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get(url);
    }

    public WebElement getSignUpButton() {
        return driver.findElement(signUpButtonPath);
    }

    public WebElement getForgotButton() {
        return driver.findElement(forgotButtonPath);
    }

    public void clickSignUpButton() {
        WebElement button = getSignUpButton();
        button.click();
    }

    public void clickForgotButton() {
        WebElement button = getForgotButton();
        button.click();
    }
}
