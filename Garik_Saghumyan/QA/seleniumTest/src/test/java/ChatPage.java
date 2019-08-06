import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.testng.Reporter;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ChatPage extends WebDriverSetUp {

    By chatClass = By.xpath("/html/body/div");
    By friendsName =  By.xpath("/html/body/div/div/div[1]/div[1]/h3");
    By postsText = By.xpath("/html/body/div/div/div[1]/div[3]/h3");
    By name = By.id("uName");
    By textarea = By.id("privateText");
    By send = By.xpath("/html/body/div/div/div[3]/div[2]/div/button");
    By message = By.xpath("//*[@id=\"messages\"]/li");
    By posts = By.id("publicText");
    By sendPost = By.xpath("/html/body/div/div/div[3]/div[3]/div/button");
    By id = By.xpath("//*[@id=\"publicMessages\"]");

    public String getClassName(WebDriver driver){
        return driver.findElement(chatClass).getAttribute("class");
    }

    public String getFriendsText(WebDriver driver){
        return driver.findElement(friendsName).getText();
    }

    public String getPostsText(WebDriver driver){
        return driver.findElement(postsText).getText();
    }
    public String getName(WebDriver driver){
        return driver.findElement(name).getText();
    }

    public void writeMessage(WebDriver driver, String message){
        WebElement text = driver.findElement(textarea);
        text.sendKeys(message);
    }
    public void sendMessage(WebDriver driver){
        WebElement write = driver.findElement(send);
        write.click();
    }

    public String getMessageText(WebDriver driver){
        return driver.findElement(message).getText();
    }

    public void writePost(WebDriver driver){
        WebElement post = driver.findElement(posts);
        post.sendKeys("My current post");
    }
    public void sendPost(WebDriver driver){
        WebElement send = driver.findElement(sendPost);
        send.click();
    }
    public String getPostsId(WebDriver driver){
        return driver.findElement(id).getAttribute("id");
    }
    public  void takeScreenshot(WebDriver driver ){
        String timeStamp;
        File screenShotName;
        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);

        timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime());
        screenShotName = new File("src/resources/Screenshots/"+timeStamp+".png");
        try {
            FileUtils.copyFile(scrFile, screenShotName);
        } catch (IOException e) {
            e.printStackTrace();
        }


        String filePath = screenShotName.toString();
        System.out.println(filePath);
        String path = "<img src="+filePath+"/>";
        Reporter.log(path);
    }

}
