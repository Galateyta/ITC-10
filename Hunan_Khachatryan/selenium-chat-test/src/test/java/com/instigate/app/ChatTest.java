package com.instigate.app;


import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;
import org.testng.annotations.*;

import java.util.concurrent.TimeUnit;

public class ChatTest {
    private WebDriver driver;

    @BeforeSuite
    public void setUp() {
//        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        driver.get("http://localhost:4000");

    }

    @AfterClass
    public void exit()
    {
        driver.quit();
    }

    @BeforeMethod
    public void before(){
        driver.navigate().refresh();

    }

    // check title
    @Test
    public void checkTitle() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        String title = home.getTitle();
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");
    }

    // login and check username
    @Test
    public void signIn() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        Assert.assertTrue(home.getUserName().contains("hunan"));

    }

    // login width epmty  username
    @Test
    public void signInEmptyName() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("");
        Assert.assertFalse(home.getUserName().contains(""));

    }

    //login and check friend name
    @Test
    public void findFriend() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        Assert.assertTrue(home.getFriendName("hayk").contains("hayk"));
    }

    //send message to friends
    @Test
    public void sendMessage() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk", "hellow");
    }

    //send message to friend and check it
    @Test
    public void sendMessageAndCheck() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk", "hellow");
        Assert.assertTrue(home.getMessage("hayk").contains("hellow"));
        home.captureScreenShot();

    }
    //send empty message

    @Test
    public void sendEmptyMessageAndCheck() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk", "");
        Assert.assertFalse(home.getMessage("hayk").contains(""));
        home.captureScreenShot();

    }

    //add post
    @Test
    public void addPost() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.addPost("hellow");
        Assert.assertTrue(home.getPost().contains("hellow"));
        home.captureScreenShot();


    }

    //add post
    @Test
    public void addEmptyPost() {
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.addPost("");
        Assert.assertFalse(home.getPost().contains(""));
        home.captureScreenShot();

    }

}
