package am.instigatembile.com;

import java.util.concurrent.TimeUnit;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.firefox.FirefoxDriver;

import org.openqa.selenium.chrome.ChromeDriver;

import org.testng.Assert;

import org.testng.annotations.AfterTest;

import org.testng.annotations.BeforeTest;

import org.testng.annotations.Test;

import pages.SignInPage;
import pages.SignUpPage;

//import PageFactory.HomePage;

public class TestSignInPage {

    WebDriver driver;

    SignInPage objSignIn;
    SignUpPage objSignUp;
    //HomePage homePage;

    @BeforeTest

    public void setup(){

        //System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver");
        //System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
       // WebDriverManager.firefoxdriver().setup();
        WebDriverManager.chromedriver().setup();
        //driver = new FirefoxDriver();

        driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("http://localhost:3000");

    }

    @AfterTest
    public void closeDriver (){
       // driver.quit();
    }

    /*

     * This test go to "http://localhost:3000")

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

        Assert.assertTrue(PageTitle.contains("React App"));

        //SignUp to application
        System.out.println("clickSignUp");
        objSignIn.clickSignUp();
        System.out.println("clickSignUp");
        objSignUp = new SignUpPage(driver);

       // objSignIn.signInTo("Anahit", "anahit");

        // go the next page

       // objHomePage = new HomePage(driver);

        
    }

}