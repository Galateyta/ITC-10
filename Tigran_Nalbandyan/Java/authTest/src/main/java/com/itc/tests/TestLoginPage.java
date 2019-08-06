package com.itc.tests;

import com.itc.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class TestLoginPage {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeClass
    public void init() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        loginPage = new LoginPage(driver);
    }

    @BeforeMethod
    public void openLoginPage() {
        loginPage.open();
    }

    @Test
    public void checkSignUpButtonText() {
        WebElement button = loginPage.getSignUpButton();
        final String actual = button.getText();
        final String expected = "Sign up";
        Assert.assertEquals(actual, expected, "Invalid sign up button text");
    }

    @Test
    public void checkForgotButtonText() {
        WebElement button = loginPage.getForgotButton();
        final String actual = button.getText();
        final String expected = "Forgot password";
        Assert.assertEquals(actual, expected, "Invalid forgot button text");
    }

    @Test
    public void checkSignUpButton() {
        loginPage.clickSignUpButton();
        final String actual = driver.getCurrentUrl();
        final String expected = "http://localhost:3000/registry";
        Assert.assertEquals(actual, expected, "Invalid sign up button");
    }

    @Test
    public void checkForgotButton() {
        loginPage.clickForgotButton();
        final String actual = driver.getCurrentUrl();
        final String expected = "http://localhost:3000/reset";
        Assert.assertEquals(actual, expected, "Invalid forgot button");
    }

    @AfterClass
    public void endTest() {
        driver.quit();
    }
}
