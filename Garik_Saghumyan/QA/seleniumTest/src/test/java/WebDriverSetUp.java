import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import java.util.concurrent.TimeUnit;

public class WebDriverSetUp {

    WebDriver driver;

    @Parameters("browser")
    @BeforeClass
    public  void createDriver(@Optional("chrome") String browser) {
        if(browser.equalsIgnoreCase("chrome")) {
//            System.setProperty("webdriver.chrome.driver", "src/resources/chromedriver");
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
            driver.manage().window().maximize();
        } else if (browser.equalsIgnoreCase("firefox")) {
//            System.setProperty("webdriver.gecko.driver", "src/resources/geckodriver");
            WebDriverManager.firefoxdriver().setup();
            driver = new FirefoxDriver();
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
            driver.manage().window().maximize();
        }
    }

    @AfterClass
    public void closeBrowser(){
        driver.quit();
    }

}
