import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;


public class ChatPage extends WebDriverSetUp {
    @FindBy(xpath="/html/body/div")
    WebElement chatClass;
    @FindBy(xpath = "/html/body/div/div/div[1]/div[1]/h3")
    WebElement friendsName;
    @FindBy(xpath = "/html/body/div/div/div[1]/div[3]/h3")
    WebElement postsText;
    @FindBy(id = "uName")
    WebElement name;
    @FindBy(id = "privateText")
    WebElement textarea;
    @FindBy(xpath = "/html/body/div/div/div[3]/div[2]/div/button")
    WebElement send;
    @FindBy(xpath = "//*[@id=\"messages\"]/li")
    WebElement message;
    @FindBy(id = "publicText")
    WebElement posts;
    @FindBy(xpath = "/html/body/div/div/div[3]/div[3]/div/button")
    WebElement sendPost;
    @FindBy(xpath = "//*[@id=\"publicMessages\"]")
    WebElement id;

    public String getClassName(){
        return chatClass.getAttribute("class");
    }

    public String getFriendsText(){
        return friendsName.getText();
    }

    public String getPostsText(){
        return postsText.getText();
    }
    public String getName(){
        return name.getText();
    }

    public void writeMessage( String message){

        textarea.sendKeys(message);
    }
    public void sendMessage(){
        send.click();
    }

    public String getMessageText(){
        return message.getText();
    }

    public void writePost(){
        posts.sendKeys("My current post");
    }
    public void sendPost(){
        sendPost.click();
    }
    public String getPostsId(){
        return id.getAttribute("id");
    }


}
