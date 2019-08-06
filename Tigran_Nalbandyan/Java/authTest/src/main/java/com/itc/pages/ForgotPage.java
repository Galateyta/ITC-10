package com.itc.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ForgotPage {
    private WebDriver driver;

    public final String url = "http://localhost:3000/reset";

    private final By emailInputPath = By.xpath("//input[@id=\"email\"]");
    private final By submitButtonPath = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[3]/button");

    public ForgotPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get(url);
    }

    public WebElement getEmailInput() {
        return driver.findElement(emailInputPath);
    }

    public WebElement getSubmitButton() {
        return driver.findElement(submitButtonPath);
    }

    public void sendEmailInput(String text) {
        WebElement input = getEmailInput();
        input.sendKeys(text);
    }

    public void clickSubmitButton() {
        WebElement button = getSubmitButton();
        button.click();
    }
}
