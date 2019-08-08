package tests;

import org.openqa.selenium.UnexpectedAlertBehaviour;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

public class BasePage {
    public static WebDriver driver;
    DesiredCapabilities desiredCapabilities;

    @BeforeSuite
    @Parameters(value = { "browser"})
    @SuppressWarnings("unchecked")
    public void initParameters(@Optional("chrome") String browser) {
        System.setProperty("browser", browser);

        System.setProperty("webdriver.chrome.driver", "/usr/lib/chromium-browser/chromedriver");
        System.setProperty("webdriver.gecko.driver", "/home/abul/Desktop/workspace/browserstack/myapp/src/resources/geckodriver");
        driver = initWebDriver();
        driver.get("http://localhost:3000/");

    }

    public WebDriver initWebDriver() {
        if (driver == null) {
            desiredCapabilities = new DesiredCapabilities();
            desiredCapabilities.setCapability(CapabilityType.UNEXPECTED_ALERT_BEHAVIOUR, UnexpectedAlertBehaviour.IGNORE);
            driver = System.getProperty("browser").equals("chrome") ? new ChromeDriver(desiredCapabilities) : new FirefoxDriver(desiredCapabilities);
        }
        return driver;
    }
}
