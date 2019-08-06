package test;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.firefox.FirefoxDriver;

import org.testng.Assert;

import org.testng.annotations.BeforeTest;

import org.testng.annotations.Test;

import PageFactory.SignInPage;

//import PageFactory.HomePage;

public class TestSignInPage {

    WebDriver driver;

    SignInPage objSignUp;
    //HomePage homePage;

    @BeforeTest

    public void setup(){

        System.setProperty("webdriver.gecko.driver", "src/resources/geckodriver");

        driver = new FirefoxDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("http://localhost:3000/login");

    }

    /*

     * This test go to "http://localhost:3000/login")

     * Verify signIn page title

     * SignUp to application

     * Verify the login page using 

     */

    @Test(priority=0)

    public void test_Home_Page_Appear_Correct(){

        //Create signIn Page object

        objSignIn = new SignInPage(driver);

        //Verify signIn page title

        String PageTitle = objSignIn.getSignUpTitle();

        Assert.assertTrue(PageTitle.toLowerCase().contains("React App"));

        //SignUp to application

        objSignIn.signUpTo("Anahit", "anahit");

        // go the next page

       // objHomePage = new HomePage(driver);

        
    }

}