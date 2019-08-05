import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ChatPage extends WebDriverSetUp {

    By chatClass = By.xpath("/html/body/div");
    By friendsName =  By.xpath("/html/body/div/div/div[1]/div[1]/h3");
    By postsText = By.xpath("/html/body/div/div/div[1]/div[3]/h3");
    By name = By.id("uName");
    By textarea = By.id("textarea");
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
}
