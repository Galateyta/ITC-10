
import org.testng.Assert;
import org.testng.annotations.*;


public class SeleniumTest extends WebDriverSetUp {

    FirstPage firstPage = new FirstPage();
    ChatPage chatPage = new ChatPage();

    @Test
    public void checkTitle(){
        firstPage.goToPage(driver);
        String title = firstPage.getTitle(driver);
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");
    }
    @Test
    public void goToChatWithName() {
        firstPage.goToPage(driver);
        firstPage.writeName(driver);
        firstPage.goToChat(driver);
        Assert.assertTrue(true, "goToChatWithName function failed");
    }

    @Test
    public void goToHomePageWithoutName() {
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String className = chatPage.getClassName(driver);
        Assert.assertEquals(className,"chat-form", "goToChatWithoutName function failed");
    }
    @Test
    public void gotoChatAndCheckFriends(){
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String friends = chatPage.getFriendsText(driver);
        Assert.assertEquals(friends, "Friends", "gotoChatAndCheckFriends function failed");
    }
    @Test
    public void gotoChatAndCheckPotss(){
        firstPage.goToPage(driver);
        firstPage.goToChat(driver);
        String posts = chatPage.getPostsText(driver);
        Assert.assertEquals(posts, "Posts", "gotoChatAndCheckFriends function failed");
    }
    @Test
    public void gotoChatAndCheckName(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver);
        firstPage.goToChat(driver);
        String name = chatPage.getName(driver);
        Assert.assertEquals(name, "Garik", "gotoChatAndCheckName function failed");
    }

    @Test
    public void goToChatAngSendMessage(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver);
        firstPage.goToChat(driver);
        chatPage.writeMessage(driver);
        chatPage.sendMessage(driver);
        String message = chatPage.getMessageText(driver);
        Assert.assertEquals(message, "Garik: Hello", "goToChatAngSendMessage function failed");
    }
    @Test
    public void goToChatAndAddPost(){
        firstPage.goToPage(driver);
        firstPage.writeName(driver);
        firstPage.goToChat(driver);
        chatPage.writePost(driver);
        chatPage.sendPost(driver);
        String id = chatPage.getPostsId(driver);
        String expected = "publicMessages";
        Assert.assertEquals(id, expected, "goToChatAndAddPost function failed");
    }

}
