package am.instigatembile.com;

import java.util.concurrent.TimeUnit;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.WebDriver;

import org.openqa.selenium.firefox.FirefoxDriver;

import org.openqa.selenium.chrome.ChromeDriver;

import org.testng.Assert;

import org.testng.annotations.AfterClass;

import org.testng.annotations.AfterTest;

import org.testng.annotations.BeforeTest;

import org.testng.annotations.Test;

import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;

import org.apache.commons.io.FileUtils;

import org.openqa.selenium.OutputType;

import org.openqa.selenium.TakesScreenshot;

import pages.SignUpPage;

import pages.SignInPage;

//import PageFactory.SignInPage;

public class TestSignUpPage {

    WebDriver driver;

    SignUpPage objSignUp;
    SignInPage objSignIn;


    /**

     * This function will take screenshot

     * @param webdriver

     * @param fileWithPath

     * @throws Exception

     */

    public static void takeSnapShot(WebDriver webdriver,String fileWithPath) throws Exception {

        //Convert web driver object to TakeScreenshot

        TakesScreenshot scrShot = ((TakesScreenshot)webdriver);

        //Call getScreenshotAs method to create image file

        File SrcFile = scrShot.getScreenshotAs(OutputType.FILE);

        //Move image file to new destination

        File DestFile = new File(fileWithPath);

        //Copy file at destination

        FileUtils.copyFile(SrcFile, DestFile);

    }

    @Test

    public void testTakeScreenShot() throws Exception{

        //Call take screenshot function

        this.takeSnapShot(driver, "src/main/resources/screenshots/snap.png") ;

    }



    @BeforeTest

    public void setup(){

        //System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver");
        //System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        //WebDriverManager.chromedriver().setup();
        WebDriverManager.firefoxdriver().setup();
        driver = new FirefoxDriver();

        //driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("http://localhost:3000/registry");

        objSignUp = new SignUpPage(driver);

    }

    @AfterClass
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

    public void test_Page_Title_Correct(){

        //Create signUp Page object

        //Verify signUP page title

        String PageTitle = objSignUp.getSignUpTitle();
        System.out.println("----"+PageTitle+"-------");
        Assert.assertTrue(PageTitle.contains("React App"));

        //SignUp to application

        //objSignUp.clickSignUp();
        // go the next page

        //objSignIn = new SignInPage(driver);
        
    }

    @Test(priority=1)

    public void test_Name_Is_Emptyt(){

        //Create signUp Page object

        objSignUp.signUpTo("Anahit", "Karyan", "23", "1anahit1@mail.ru", "female", "anahit");

        WebDriverWait wait = new WebDriverWait(driver, 300);
        System.out.println(objSignUp.getUserName() + "----------------------------------");


        Assert.assertNotEquals (objSignUp.getUserName(), "");
        //Assert.assertFalse(objSignUp.getUserName().contains(""));

    }

    @Test(priority=1)

    public void test_Name_Is_Firs_Simbol_Check(){

        //Create signUp Page object

        objSignUp.signUpTo("anahit", "Karyan", "23", "1anahit1@mail.ru", "female", "anahit");

        char firsSimbol = objSignUp.getUserName().charAt(0);
        boolean check = true;

        if(firsSimbol < 'A' || firsSimbol > 'Z') {
            check = false;
        }

        Assert.assertTrue(check);

    }

    @Test(priority=1)

    public void test_SurName_Is_Emptyt(){

        //Create signUp Page object

        objSignUp.signUpTo("Anahit", "", "23", "1anahit1@mail.ru", "female", "anahit");

        WebDriverWait wait = new WebDriverWait(driver, 300);

        Assert.assertNotEquals (objSignUp.getUserSurName(), "");


    }

    @Test(priority=1)

    public void test_SurName_Is_Firs_Simbol_Check(){

        //Create signUp Page object

        objSignUp.signUpTo("anahit", "karyan", "23", "1anahit1@mail.ru", "female", "anahit");

        char firsSimbol = objSignUp.getUserSurName().charAt(0);
        boolean check = true;

        if(firsSimbol < 'A' || firsSimbol > 'Z') {
            check = false;
        }

        Assert.assertTrue(check);

    }


    @Test(priority=1)

    public void test_Age_Emptyt(){

        //Create signUp Page object

        objSignUp.signUpTo("Anahit", "", "23", "1anahit1@mail.ru", "female", "anahit");

        WebDriverWait wait = new WebDriverWait(driver, 300);

        Assert.assertNotEquals (objSignUp.getUserAge(), "");

    }

    @Test(priority=1)

    public void test_Age_Is_Firs_Simbol_Check(){

        //Create signUp Page object

        objSignUp.signUpTo("anahit", "karyan", "-23", "1anahit1@mail.ru", "female", "anahit");

        char firsSimbol = objSignUp.getUserAge().charAt(0);
        Assert.assertNotEquals (firsSimbol, '-');

    }

    @Test(priority=1)
    public void test_Password_Emptyt(){

        //Create signUp Page object

        objSignUp.signUpTo("Anahit", "", "23", "1anahit1@mail.ru", "female", "");

        WebDriverWait wait = new WebDriverWait(driver, 300);

        Assert.assertNotEquals (objSignUp.getPassword(), "");

    }
}