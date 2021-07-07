import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Properties;
import java.util.Set;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Nakrutka {
    private static WebDriver driver;
    
    public static void sendMail(String message) {
        System.out.println("\n 1st ===> setup Mail Server Properties..");
        Properties mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");
        System.out.println("Mail Server Properties have been setup successfully..");

        try {
            System.out.println("\n\n 2nd ===> get Mail Session..");
            Session getMailSession = Session.getDefaultInstance(mailServerProperties, null);
            MimeMessage generateMailMessage = new MimeMessage(getMailSession);
            generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("tigran.nalbandyan03@gmail.com"));
            generateMailMessage.addRecipient(Message.RecipientType.CC, new InternetAddress("saghumyangarik@gmail.com"));
            generateMailMessage.setSubject("YouTube Description");
            String emailBody = "The description is: " + message + "<br><br> Regards, <br>Tigran";
            generateMailMessage.setContent(emailBody, "text/html");
            System.out.println("Mail Session has been created successfully..");

            System.out.println("\n\n 3rd ===> Get Session and Send mail");
            Transport transport = getMailSession.getTransport("smtp");

            transport.connect("smtp.gmail.com", "authorisation.app", "ITC102019");
            transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
            transport.close();
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        final String url = "https://www.youtube.com";
        final String search = "Selenium is not for testing";

        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();

        driver.get(url);

        driver.findElement(By.xpath("//input[@id=\"search\"]")).sendKeys(search);
        driver.findElement(By.xpath("//button[@id=\"search-icon-legacy\"]")).click();
        Thread.sleep(2000);

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(0,4000)");

        Thread.sleep(3000);

        int videoCount = 0;
        float maxCount = 0;
        String maxUrl = "";

        for (WebElement element : driver.findElements(By.xpath("//ytd-video-renderer"))) {
            String[] countArr = element.findElement(By.xpath(".//div[@id=\"metadata-line\"]/span")).getText().split(" ");
            float viewCount = 0;
            if (countArr.length > 1) {
                String count = countArr[0];

                viewCount = Float.parseFloat(count.substring(0, count.length()-1));
                if (count.charAt(count.length()-1) == 'K') {
                    viewCount *= 1000;
                } else if (count.charAt(count.length()-1) == 'M') {
                    viewCount *= 1000000;
                }
            }

            if (viewCount > maxCount) {
                System.out.println("Max " + Float.toString(viewCount));
                maxCount = viewCount;
                maxUrl = element.findElement(By.tagName("a")).getAttribute("href");
            }

            if (++videoCount == 20) {
                break;
            }
        };

        System.out.println(maxUrl);
        System.out.println(maxCount);

        ((JavascriptExecutor)driver).executeScript("window.open('about:blank','_blank');");
        Set<String> handles = driver.getWindowHandles();
        String currentWindowHandle = driver.getWindowHandle();
        for (String handle : handles) {
            if (!currentWindowHandle.equals(handle)) {
                driver.switchTo().window(handle);
            }
        }
        driver.get(maxUrl);

        WebDriverWait wait = new WebDriverWait(driver, 2);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@id=\"meta\"]")));

        String description = driver.findElement(By.xpath("//div[@id=\"meta\"]")).getText();
        System.out.println(description);

        sendMail(description.replace("\n", "<br>"));

        Thread.sleep(20 * 1000);

        driver.quit();
    }
}
