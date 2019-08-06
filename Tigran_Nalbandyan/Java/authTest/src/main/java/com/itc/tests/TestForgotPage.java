package com.itc.tests;

import com.itc.pages.ForgotPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class TestForgotPage {
    private WebDriver driver;
    private ForgotPage forgotPage;

    @BeforeClass
    public void init() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        forgotPage = new ForgotPage(driver);
    }

    @BeforeMethod
    public void openForgotPage() {
        forgotPage.open();
    }

    @Test
    public void checkSubmitButtonText() {
        WebElement button = forgotPage.getSubmitButton();
        final String actual = button.getText();
        final String expected = "Reset";
        Assert.assertEquals(actual, expected, "Invalid sign up button text");
    }

    @Test
    public void checkEmailInput() {
        final WebElement input = forgotPage.getEmailInput();
        final String actual = input.getAttribute("name");
        final String expected = "email";
        Assert.assertEquals(actual, expected, "Invalid email input");
    }

    @Test
    public void checkForgotPassword() {
        final String email = "tigran.nalbandyan03@gmail.com";

        forgotPage.sendEmailInput(email);
        forgotPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 3); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Forgot password with correct data is failed!");
    }

    @Test
    public void checkForgotPasswordInvalidEmail() {
        final String email = "best@email?ever.@@";

        forgotPage.sendEmailInput(email);
        forgotPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 3); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/reset";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Successfully forgot password with invalid email!");
    }

    @Test
    public void checkForgotPasswordNotRegisteredEmail() {
        final String email = "100percent.not.registered.email@gmail.com";

        forgotPage.sendEmailInput(email);
        forgotPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 3); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/reset";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Successfully forgot password with email that not registered!");
    }

    @AfterClass
    public void endTest() {
        driver.quit();
    }
}