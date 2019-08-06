
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.*;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


public class SeleniumTest extends WebDriverSetUp {



    FirstPage firstPage = new FirstPage();
    ChatPage chatPage = new ChatPage();

    // this function goes to page and check page title
    @Test
    public void checkTitle(){
        firstPage.goToPage(driver);
        String title = firstPage.getTitle(driver);
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");

        chatPage.takeScreenshot(driver);

    }

    // this function writes users name and go to chat page
    @Test
    public void goToChatWithName() {
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);

        Assert.assertTrue(true, "goToChatWithName function failed");

        chatPage.takeScreenshot(driver);

    }
    // this function goes to chat page without writing users name
    @Test
    public void goToHomePageWithoutName() {
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String className = chatPage.getClassName(driver);
        Assert.assertEquals(className,"chat-form", "goToChatWithoutName function failed");

        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page and checks the friends ui components text
    @Test
    public void gotoChatAndCheckFriends(){
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String friends = chatPage.getFriendsText(driver);
        Assert.assertEquals(friends, "Friends", "gotoChatAndCheckFriends function failed");

        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page and checks the postss ui components text
    @Test
    public void gotoChatAndCheckPotss(){
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String posts = chatPage.getPostsText(driver);
        Assert.assertEquals(posts, "Posts", "gotoChatAndCheckFriends function failed");
        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page with users name and checks the name is correct or not
    @Test
    public void gotoChatAndCheckName(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);
        String name = chatPage.getName(driver);
        Assert.assertEquals(name, "Garik", "gotoChatAndCheckName function failed");

        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page with users name,
    // send message without specifying any other user and check message text is correct or not
    @Test
    public void goToChatAngSendMessage(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);
        chatPage.writeMessage(driver, "Hello");
        chatPage.sendMessage(driver);
        String message = chatPage.getMessageText(driver);
        Assert.assertEquals(message, "Garik: Hello", "goToChatAngSendMessage function failed");
        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page with users name,
    // adds post  and check posts correct id  exists or not
    @Test
    public void goToChatAndAddPost(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);
        chatPage.writePost(driver);
        chatPage.sendPost(driver);
        String id = chatPage.getPostsId(driver);
        String expected = "publicMessages";
        Assert.assertEquals(id, expected, "goToChatAndAddPost function failed");

        chatPage.takeScreenshot(driver);

    }
    //this function goes to chat with username Garik, open private chat with john, switches to new tab goes to chat
    //with username john , send message to Garik , awitches to previous tab and check message text is correct or not
    @Test
    public void sendMessageToAnotherUser(){
        ((JavascriptExecutor) driver).executeScript("window.open()");
        List<String> tabs = new ArrayList<>(driver.getWindowHandles());

        WebDriverWait wait = new WebDriverWait(driver, 10);

        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);
        driver.switchTo().window(tabs.get(1));
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "john");
        firstPage.goToChat(driver);
        driver.switchTo().window(tabs.get(0));
        driver.findElement(By.id("john")).click();
        driver.switchTo().window(tabs.get(1));
        driver.findElement(By.id("Garik")).click();
        chatPage.writeMessage(driver, "vonces");
        chatPage.sendMessage(driver);
        driver.switchTo().window(tabs.get(0));
        String message = driver.findElement(By.id("messages")).getText();
        String expected = "john: vonces";
        Assert.assertEquals(message, expected , "sendMessageToAnotherUser is failed");

        chatPage.takeScreenshot(driver);

    }

    // this function goes to chat page with username Garik, open chat with user john, switches to new tab goes to chat page with  username john,
    // send message to previous Garik , switches to previous tab and send message to  john and check sizes of messages in 2 tabs,
    // in normal case they will be equal
    @Test
    public void privateChatBetWeenTwoUsers(){
        ((JavascriptExecutor) driver).executeScript("window.open()");
        List<String> tabs = new ArrayList<>(driver.getWindowHandles());

        WebDriverWait wait = new WebDriverWait(driver, 10);

        firstPage.goToPage(driver);
        firstPage.writeName(driver, "Garik");
        firstPage.goToChat(driver);
        driver.switchTo().window(tabs.get(1));
        firstPage.goToPage(driver);
        firstPage.writeName(driver, "john");
        firstPage.goToChat(driver);
        driver.switchTo().window(tabs.get(0));
        driver.findElement(By.id("john")).click();
        driver.switchTo().window(tabs.get(1));
        wait.until(ExpectedConditions.elementToBeClickable(By.id("uName")));
        driver.findElement(By.id("Garik")).click();
        chatPage.writeMessage(driver, "barev Garik");
        chatPage.sendMessage(driver);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("messages")));
        driver.switchTo().window(tabs.get(0));
        wait.until(ExpectedConditions.elementToBeClickable(By.id("uName")));
        chatPage.writeMessage(driver, "barev john");
        chatPage.sendMessage(driver);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("messages")));
        Dimension messages1 = driver.findElement(By.id("messages")).getSize();
        driver.switchTo().window(tabs.get(1));
        Dimension messages2 = driver.findElement(By.id("messages")).getSize();
        boolean isEqual = messages1.equals(messages2);
        Assert.assertEquals(isEqual, true, "privateChatBetWeenTwoUsers is failed");

        chatPage.takeScreenshot(driver);

    }

}
