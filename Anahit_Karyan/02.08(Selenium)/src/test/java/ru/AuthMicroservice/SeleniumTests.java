package ru.AuthMicroservice;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.testng.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.Random;


public class SeleniumTests {

    WebDriver driver;

    @BeforeClass
    public void setUp ( ) {
        System.setProperty("webdriver.gecko.driver", "src/resources/geckodriver");
        driver = new FirefoxDriver();
    }

    @AfterClass
    public void closeDriver (){
        driver.quit();
    }
    @Test
    public void checkTitle(){
        driver.get("http://localhost:3000");
        String title = driver.getTitle();
        Assert.assertEquals(title, "React App", "page title is wrong");
    }
    @Test
    public void checkSignUpButtonClick(){
        driver.get("http://localhost:3000");
        driver.findElement(By.className("style.signUpButton")).click();
        WebDriverWait wait = new WebDriverWait(driver, 30);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("gender")));
    }
    @Test
    public void checkSignUp(){
        driver.get("http://localhost:3000");

        Random random = new Random();
        int num = random.nextInt(1000) + 1;
        String email = "anahit" + num + "@mail.ru";

        driver.findElement(By.id("name")).sendKeys("Anahit");
        driver.findElement(By.id("surname")).sendKeys("Karyan");
        driver.findElement(By.id("age")).sendKeys("23");
        driver.findElement(By.id("email")).sendKeys(email);
        driver.findElement(By.id("gender")).sendKeys("female");
        driver.findElement(By.id("password")).sendKeys("anahit123");

        driver.findElement(By.cssSelector("button[type=\"submit\"]")).click();

        WebDriverWait wait = new WebDriverWait(driver, 30);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("style.logOutButton")));
    }

}
