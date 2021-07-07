package com.itc.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SignUpPage {
    private WebDriver driver;

    public final String url = "http://localhost:3000/registry";

    private WebElement name;
    private WebElement surname;
    private WebElement age;
    private WebElement email;
    private WebElement gender;
    private WebElement password;

    private final By submitButtonPath = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button");

    public SignUpPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get(url);
    }

    public WebElement getNameInput() {
        return this.name;
    }

    public WebElement getSurnameInput() {
        return this.surname;
    }

    public WebElement getAgeInput() {
        return this.age;
    }

    public WebElement getEmailInput() {
        return this.email;
    }

    public WebElement getGenderButton() {
        return this.gender;
    }

    public WebElement getPasswordInput() {
        return this.password;
    }

    public WebElement getSubmitButton() {
        return driver.findElement(submitButtonPath);
    }

    public void sendNameInput(String text) {
        WebElement input = getNameInput();
        input.sendKeys(text);
    }

    public void sendSurnameInput(String text) {
        WebElement input = getSurnameInput();
        input.sendKeys(text);
    }

    public void sendAgeInput(String text) {
        WebElement input = getAgeInput();
        input.sendKeys(text);
    }

    public void sendEmailInput(String text) {
        WebElement input = getEmailInput();
        input.sendKeys(text);
    }

    public void clickGenderButton() {
        WebElement button = getGenderButton();
        button.click();
    }

    public void sendPasswordInput(String text) {
        WebElement input = getPasswordInput();
        input.sendKeys(text);
    }

    public void clickSubmitButton() {
        WebElement button = getSubmitButton();
        button.click();
    }
}