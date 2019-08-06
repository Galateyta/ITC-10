package com.itc.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SignUpPage {
    private WebDriver driver;

    public final String url = "http://localhost:3000/registry";

    private final By nameInputPath = By.xpath("//input[@id=\"name\"]");
    private final By surnameInputPath = By.xpath("//input[@id=\"surname\"]");
    private final By ageInputPath = By.xpath("//input[@id=\"age\"]");
    private final By emailInputPath = By.xpath("//input[@id=\"email\"]");
    private final By genderButtonPath = By.xpath("//*[@id=\"gender\"][@value=\"male\"]");
    private final By passwordInputPath = By.xpath("//input[@id=\"password\"]");
    private final By submitButtonPath = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div/div[8]/button");

    public SignUpPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open() {
        driver.get(url);
    }

    public WebElement getNameInput() {
        return driver.findElement(nameInputPath);
    }

    public WebElement getSurnameInput() {
        return driver.findElement(surnameInputPath);
    }

    public WebElement getAgeInput() {
        return driver.findElement(ageInputPath);
    }

    public WebElement getEmailInput() {
        return driver.findElement(emailInputPath);
    }

    public WebElement getGenderButton() {
        return driver.findElement(genderButtonPath);
    }

    public WebElement getPasswordInput() {
        return driver.findElement(passwordInputPath);
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