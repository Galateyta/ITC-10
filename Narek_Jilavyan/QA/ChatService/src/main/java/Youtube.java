import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import java.util.List;

public class Youtube {
    public static void main(String[] args) throws InterruptedException, AddressException, MessagingException {

        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");

        WebDriver myDriver = new ChromeDriver();

        myDriver.get("http://youtube.com/");

        System.out.println(myDriver.getTitle());

        myDriver.findElement(By.id("search")).sendKeys("Selenium");
        myDriver.findElement(By.id("search")).sendKeys(Keys.RETURN);

        Thread.sleep(2000);

        JavascriptExecutor js = (JavascriptExecutor) myDriver;
        js.executeScript("window.scrollBy(0,5000)");

        Thread.sleep(3000);

        List<WebElement> videos = myDriver.findElements(By.xpath("//ytd-video-renderer"));
//        List<WebElement> videos = myDriver.findElements(By.xpath("//ytd-item-section-renderer"));

        System.out.println(videos.size());

        double maxcount = 0.0;
        int maxIndex = 0;

        for(int i = 0; i < 30 ; i++ ){
            String[] countArr = videos.get(i).findElement(By.xpath(".//div[@id=\"metadata-line\"]/span")).getText().split(" ");
            double count = 0;
            if(countArr.length > 1){
                String countString = countArr[0];

                count = Double.parseDouble(countString.substring(0, countString.length()-1));
                if (countString.charAt(countString.length()-1) == 'K'){
                    count *= 1000;
                } else if (countString.charAt(countString.length()-1) == 'M'){
                    count *= 1000000;
                }
            }
            if(maxcount < count){
                maxcount = count;
                maxIndex = i;
            }
        }

        String maxUrl = videos.get(maxIndex).findElement(By.tagName("a")).getAttribute("href");

        myDriver.get(maxUrl);

        Thread.sleep(1000);

        String description = myDriver.findElement(By.xpath("//div[@id=\"meta\"]")).getText();
        System.out.println(description);

        Thread.sleep(10000);

        myDriver.quit();

        Properties mailServerProperties;
        Session getMailSession;
        MimeMessage generateMailMessage;

        mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");

        getMailSession = Session.getDefaultInstance(mailServerProperties, null);
        generateMailMessage = new MimeMessage(getMailSession);
        generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress("narek_jilavyan@mail.ru"));
        generateMailMessage.setSubject("Greetings from Crunchify..");
        String emailBody = "video : " + "<a href=" + maxUrl + ">" + maxUrl + "</a>";
        generateMailMessage.setContent(emailBody, "text/html");

        Transport transport = getMailSession.getTransport("smtp");

        transport.connect("smtp.gmail.com", "authorisation.app@gmail.com", "ITC102019");
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();
    }
}
