package com.itc.tests;

import com.itc.pages.SignUpPage;
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

public class TestSignUpPage {
    private WebDriver driver;
    private SignUpPage signUpPage;

    @BeforeClass
    public void init() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();
        signUpPage = new SignUpPage(driver);
    }

    @BeforeMethod
    public void opensignUpPage() {
        signUpPage.open();
    }

    @Test
    public void checkSignUpButtonText() {
        WebElement button = signUpPage.getSubmitButton();
        final String actual = button.getText();
        final String expected = "Sign up";
        Assert.assertEquals(actual, expected, "Invalid sign up button text");
    }

    @Test
    public void checkNameInput() {
        final WebElement input = signUpPage.getNameInput();
        final String actual = input.getAttribute("name");
        final String expected = "name";
        Assert.assertEquals(actual, expected, "Invalid name input");
    }

    @Test
    public void checkSurnameInput() {
        final WebElement input = signUpPage.getSurnameInput();
        final String actual = input.getAttribute("name");
        final String expected = "surname";
        Assert.assertEquals(actual, expected, "Invalid surname input");
    }

    @Test
    public void checkAgeInput() {
        final WebElement input = signUpPage.getAgeInput();
        final String actual = input.getAttribute("name");
        final String expected = "age";
        Assert.assertEquals(actual, expected, "Invalid age input");
    }

    @Test
    public void checkEmailInput() {
        final WebElement input = signUpPage.getEmailInput();
        final String actual = input.getAttribute("name");
        final String expected = "email";
        Assert.assertEquals(actual, expected, "Invalid email input");
    }

    @Test
    public void checkGenderButton() {
        final WebElement button = signUpPage.getGenderButton();
        final String actual = button.getAttribute("name");
        final String expected = "gender";
        Assert.assertEquals(actual, expected, "Invalid gender input");
    }

    @Test
    public void checkPasswordInput() {
        final WebElement input = signUpPage.getPasswordInput();
        final String actual = input.getAttribute("name");
        final String expected = "password";
        Assert.assertEquals(actual, expected, "Invalid password input");
    }

    @Test
    public void checkSignUp() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 2); // seconds
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));

        final String expectedUrl = "http://localhost:3000/";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Sign up with correct data is failed!");
    }

    @Test
    public void checkSignUpNameAbsent() {
        final String name = "";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without name!");
    }

    @Test
    public void checkSignUpSurnameAbsent() {
        final String name = "Tigran";
        final String surname = "";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without surname!");
    }

    @Test
    public void checkSignUpAgeAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without age!");
    }

    @Test
    public void checkSignUpEmailAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without email!");
    }

    @Test
    public void checkSignUpGenderAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "Tigrantest12";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without gender!");
    }

    @Test
    public void checkSignUpPasswordAbsent() {
        final String name = "Tigran";
        final String surname = "Nalbandyan";
        final String age = "20";
        final String email = "tigran.nalbandyan03@gmail.com";
        final String password = "";

        signUpPage.sendNameInput(name);
        signUpPage.sendSurnameInput(surname);
        signUpPage.sendAgeInput(age);
        signUpPage.sendEmailInput(email);
        signUpPage.clickGenderButton();
        signUpPage.sendPasswordInput(password);

        signUpPage.clickSubmitButton();

        WebDriverWait wait = new WebDriverWait(driver, 1); // seconds

        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//h2[contains(text(),\"Sign In\")]")));
        } catch (TimeoutException ex) {}

        final String expectedUrl = "http://localhost:3000/registry";
        final String currentUrl = driver.getCurrentUrl();

        Assert.assertEquals(currentUrl, expectedUrl, "Signed up without password!");
    }

    @AfterClass
    public void endTest() {
        driver.quit();
    }
}
