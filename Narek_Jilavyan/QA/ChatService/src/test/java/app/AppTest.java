package app;

import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

import java.util.concurrent.TimeUnit;

public class AppTest {
    private ChromeDriver driver;
    private MessagePage home;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://localhost:4000");

        this.driver.navigate().refresh();
        LogIn user = new LogIn(driver);
        MessagePage home2 = user.sign("Second");
    }

    @AfterClass
    public void exit() {
        driver.quit();
    }


    @BeforeMethod
    public void logIn() {
        driver.navigate().refresh();
        LogIn user = new LogIn(driver);
        home = user.sign("Narek");
    }

        // check title
    @Test
    public void checkTitle() {
        String title = home.getTitle();
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");
    }

    // login and check username
    @Test
    public void signIn() {
        Assert.assertTrue(home.getUserName().contains("Narek"));
    }

    //login and check friend name
    @Test
    public void findFriend() {
        Assert.assertTrue(home.getFriendName("Second").contains("Second User"));
    }

    //send message to friends
    @Test
    public void sendMessage() {
        home.sendMessageFrom("Second", "test");
    }

    //send message to friend and check it
    @Test
    public void sendMessageAndCheck() {
        home.sendMessageFrom("Second", "test");
        Assert.assertTrue(home.getMessage("Second").contains("test"));
    }
    //send empty message

    @Test
    public void sendEmptyMessageAndCheck() {
        home.sendMessageFrom("Second", "");
        Assert.assertTrue(home.getMessage("Second").contains(""));
    }

    //add post
    @Test
    public void addPost() {
        home.addPost("test");
        Assert.assertTrue(home.getPost().contains("test"));

    }

    //add post
    @Test
    public void addEmptyPost() {
        home.addPost("");
        Assert.assertTrue(home.getPost().contains(""));
    }
}