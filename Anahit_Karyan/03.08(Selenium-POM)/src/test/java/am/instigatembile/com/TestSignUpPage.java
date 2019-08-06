package am.instigatembile.com;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.firefox.FirefoxDriver;

import org.openqa.selenium.chrome.ChromeDriver;

import org.testng.Assert;

import org.testng.annotations.AfterTest;

import org.testng.annotations.BeforeTest;

import org.testng.annotations.Test;

import pages.SignUpPage;

import pages.SignInPage;

//import PageFactory.SignInPage;

public class TestSignUpPage {

    WebDriver driver;

    SignUpPage objSignUp;
    SignInPage objSignIn;

    @BeforeTest

    public void setup(){

        //System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver");
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");

       // driver = new FirefoxDriver();

        driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("http://localhost:3000/registry");

    }

    @AfterTest
    public void closeDriver (){
        driver.quit();
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
        System.out.println("----"+PageTitle+"-------");
        Assert.assertTrue(PageTitle.contains("React App"));
        System.out.println("fffffffffff");
        //SignUp to application

        objSignUp.signUpTo("Anahit", "Karyan", "23", "1anahit1@mail.ru", "female", "anahit");
        System.out.println("aaaaaaaaa");
        // go the next page

        objSignIn = new SignInPage(driver);


        
    }

}