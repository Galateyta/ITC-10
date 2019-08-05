
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;



public class  SignInPageTest  {

    SignIn signIn = new SignIn();


    private WebDriver driver;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/resources/chromedriver");
        driver = new ChromeDriver();

    }

    @Test
    public void writeEmail(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String email = signIn.getEmailValue(driver);
        //String password = signIn.getPasswordValue(driver);
        Assert.assertEquals(email, "gevorgyan.armine@inbox.ru", "aaaaaaaaaaaaaaaaaaaaaaa");
    }

    public void writeEmailfeild(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String email = signIn.getEmailValue(driver);
        Assert.assertEquals(email, "gevorgyan.armine@inbox", "aaaaaaaaaaaaaaaaaaaaaaa");
    }

    public void writeEmailEmpty(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String email = signIn.getEmailValue(driver);
        Assert.assertEquals(email, "", "aaaaaaaaaaaaaaaaaaaaaaa");
    }

    @Test
    public void writePassword(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String pass = signIn.getPasswordValue(driver);
        Assert.assertEquals(pass, "Test.147test", "aaaaaaaaaaaaaaaaaaaaaaa");
    }


    @Test
    public void writePasswordfeild(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String pass = signIn.getPasswordValue(driver);
        Assert.assertEquals(pass, "Test", "aaaaaaaaaaaaaaaaaaaaaaa");
    }

    @Test
    public void writePasswordEmpty(){

        signIn.writeEmail(driver);
        signIn.writePassword(driver);
        signIn.rememberMe(driver);
        signIn.signIn(driver);
        String pass = signIn.getPasswordValue(driver);
        Assert.assertEquals(pass, "", "aaaaaaaaaaaaaaaaaaaaaaa");
    }

    @AfterMethod
    public void exit(){
        driver.quit();
    }



}