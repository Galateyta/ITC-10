import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.Properties;

public class ForgotPasswordPageChromeTests {
    static Properties mailServerProperties;
    static Session getMailSession;
    static MimeMessage generateMailMessage;

    final String forgotPasswordPageText = "//*[@id=\"search\"]";
    final String searchButtonXpath = "//*[@id=\"search-icon-legacy\"]";

    static WebDriver driver = new ChromeDriver();
    DesiredCapabilities desiredCapabilities;

    public WebDriver initWebDriver() {
        if (driver == null) {
            desiredCapabilities = new DesiredCapabilities();
            desiredCapabilities.setCapability(CapabilityType.UNEXPECTED_ALERT_BEHAVIOUR, UnexpectedAlertBehaviour.IGNORE);
            driver = new ChromeDriver(desiredCapabilities);
        }
        return driver;
    }

    @BeforeMethod
    public void createWebDriver() {
        System.setProperty("webdriver.chrome.driver", "/home/mary/Desktop/kolibri/chrome/chromedriver");
        driver = initWebDriver();
        driver.get("https://www.youtube.com/");
    }

    @AfterSuite
    public void quitDriver() {
        driver.quit();
    }

    @Test
    public void youtubeTest() throws MessagingException {
        WebElement youtubeSearchInpute = driver.findElement(By.xpath(forgotPasswordPageText));
        youtubeSearchInpute.sendKeys("Selenium");
        WebElement searchButton = driver.findElement(By.xpath(searchButtonXpath));
        searchButton.click();
        sleepSpecificTime(5);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0,4000)");
        Double number = 0.0;
        String url = "";
        for (WebElement element : driver.findElements(By.tagName("ytd-video-renderer"))) {
            Double temp = getNumber(element.findElement(By.xpath(".//span[@class = \"style-scope ytd-video-meta-block\"]")).getText());
            if (number < temp){
                number = temp;
                url = element.findElement(By.xpath(".//a")).getAttribute("href");
            }
        }

        ((JavascriptExecutor) driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
        driver.switchTo().window(tabs.get(1));
        driver.get(url);
        sleepSpecificTime(5);
        WebElement stopButton = driver.findElement(By.xpath("//*[@id=\"movie_player\"]/div[28]/div[2]/div[1]/button"));
        stopButton.click();

        String textInfo = driver.findElement(By.xpath("//*[@id=\"meta\"]")).getText();
        generateAndSendEmail(textInfo);
        sleepSpecificTime(2);

    }

    public static void sleepSpecificTime(int second) {
        try {
            Thread.sleep(second * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static double getNumber(String viewCount) {
        String [] a;
        double number;
        if (viewCount.contains("M")){
            a = viewCount.split("M");
            number = Double.parseDouble(a[0]) * 1000000;
        }else if(viewCount.contains("K")){
            a = viewCount.split("K");
            number = Double.parseDouble(a[0]) * 1000;
        } else {
            a = viewCount.split(" ");
            number = Double.parseDouble(a[0]);
        }
        return number;
    }

    public static void generateAndSendEmail(String description) throws AddressException, MessagingException {

        System.out.println("\n 1st ===> setup Mail Server Properties..");
        mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");
        System.out.println("Mail Server Properties have been setup successfully..");

        System.out.println("\n\n 2nd ===> get Mail Session..");
        getMailSession = Session.getDefaultInstance(mailServerProperties, null);
        generateMailMessage = new MimeMessage(getMailSession);
        generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("arthur.aghajanyan.1994@mail.ru"));
        generateMailMessage.addRecipient(Message.RecipientType.CC, new InternetAddress("manantonyan@mail.ru"));
        generateMailMessage.setSubject("Youtube");
        String emailBody = "description: " + description;
        generateMailMessage.setContent(emailBody, "text/html");
        System.out.println("Mail Session has been created successfully..");

        System.out.println("\n\n 3rd ===> Get Session and Send mail");
        Transport transport = getMailSession.getTransport("smtp");

        transport.connect("smtp.gmail.com", "authorisation.app", "ITC102019");
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();
    }
}

