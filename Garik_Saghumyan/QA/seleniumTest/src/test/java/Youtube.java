import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static io.github.bonigarcia.wdm.WebDriverManager.chromedriver;


public class Youtube {

    WebDriver driver;
    @BeforeClass
    public void setUp() throws MalformedURLException {
        chromedriver().setup();
        driver = new ChromeDriver();
    }

    @Test
    public void search() throws MessagingException {
        driver.get("https://www.youtube.com");
        driver.findElement(By.id("search")).sendKeys("selenium");
        driver.findElement(By.id("search-icon-legacy")).click();
        JavascriptExecutor jsx = (JavascriptExecutor)driver;
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        jsx.executeScript("window4.scrollBy(0, 5000)");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        List<WebElement> elements = driver.findElements(By.tagName("ytd-video-renderer"));
        List<Double> counts = new ArrayList<>();
        double max = 0;
        int index = 0;
        for (int i=0; i < elements.size() ;i++){
            WebElement element = elements.get(i).findElement(By.id("metadata-line"));
            if(element.getText().split(" ")[0].contains("M")){
                counts.add(Double.parseDouble(element.getText().split(" ")[0].split("M")[0]) * 1000000);
            }else if(element.getText().split(" ")[0].contains("K")){
                counts.add(Double.parseDouble(element.getText().split(" ")[0].split("K")[0]) * 1000);
            }else{
                counts.add(Double.parseDouble(element.getText().split(" ")[0]));
            }
            if(counts.get(i) >= max){
                max = counts.get(i);
                index = i;
            }

        }
        String url = elements.get(index).findElement(By.id("video-title")).getAttribute("href");

        ((JavascriptExecutor) driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<>(driver.getWindowHandles());
        driver.switchTo().window(tabs.get(1));
        driver.get(url);
        try {
            Thread.sleep(12000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.tagName("video")).click();
        String description = driver.findElement(By.id("description")).getText();

        Properties mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");

        Session getMailSession = Session.getDefaultInstance(mailServerProperties, null);
        MimeMessage generateMailMessage = new MimeMessage(getMailSession);
        generateMailMessage.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress("saghumyangarik@gmail.com"));
        generateMailMessage.setSubject("Youtube link");
        String emailBody = description;
        generateMailMessage.setContent(emailBody, "text/html");

        Transport transport = getMailSession.getTransport("smtp");


        transport.connect("smtp.gmail.com", "authorisation.app@gmail.com", "ITC102019");
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();
    }

    @AfterClass
    public void close(){
        driver.quit();
    }

}
