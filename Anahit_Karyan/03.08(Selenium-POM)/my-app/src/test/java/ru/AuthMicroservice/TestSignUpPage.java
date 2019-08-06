package test;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.firefox.FirefoxDriver;

import org.testng.Assert;

import org.testng.annotations.BeforeTest;

import org.testng.annotations.Test;

import PageFactory.SignUpPage;

//import PageFactory.SignInPage;

public class TestSignUpPage {

    WebDriver driver;

    SignUpPage objSignUp;
    //SignIn signInPage;

    @BeforeTest

    public void setup(){

        System.setProperty("webdriver.gecko.driver", "src/resources/geckodriver");

        driver = new FirefoxDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("http://localhost:3000/registry");

    }

    /*

     * This test go to "http://localhost:3000/registry")

     * Verify signUp page title

     * SignUp to application

     * Verify the login page using 

     */

    @Test(priority=0)

    public void test_Login_Page_Appear_Correct(){

        //Create signUp Page object

        objSignUp = new SignUpPage(driver);

        //Verify signUP page title

        String PageTitle = objSignUp.getSignUpTitle();

        Assert.assertTrue(PageTitle.toLowerCase().contains("React App"));

        //SignUp to application

        objSignUp.signUpTo("Anahit", "Karyan", "23", "1anahit1@mail.ru", "fimale", "anahit");

        // go the next page

       // objSignInPage = new SignInPage(driver);

        
    }

}