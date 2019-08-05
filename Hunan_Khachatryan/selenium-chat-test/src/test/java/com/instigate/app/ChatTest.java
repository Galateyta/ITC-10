package com.instigate.app;


import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Ignore;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class ChatTest {
    private ChromeDriver driver;

    @BeforeClass
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("http://localhost:4000");

    }

    @AfterClass
    public void exit() {
        driver.quit();
    }
    // check title

    @Test
    public void checkTitle(){
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        String title = home.getTitle();
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");
    }

    // login and check username
    @Test
    public void signIn() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        Assert.assertTrue(home.getUserName().contains("hunan"));

    }
    // login width epmty  username
    @Test
    public void signInEmptyName() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("");
        Assert.assertFalse(home.getUserName().contains(""));

    }

    //login and check friend name
    @Test
    public void findFriend() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        Assert.assertTrue( home.getFriendName("hayk").contains("hayk"));
    }

    //send message to friends
    @Test
    public void sendMessage() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk","hellow");
    }
    //send message to friend and check it
    @Test
    public void sendMessageAndCheck() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk","hellow");
        Assert.assertTrue(home.getMessage("hayk").contains("hellow"));
    }
    //send empty message

    @Test
    public void sendEmptyMessageAndCheck() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.sendMessageFrom("hayk","");
        Assert.assertFalse(home.getMessage("hayk").contains(""));
    }

    //add post
    @Test
    public void addPost() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.addPost("hellow");
        Assert.assertTrue(home.getPost().contains("hellow"));

    }

    //add post
    @Test
    public void addEmptyPost() {
        driver.navigate().refresh();
        SignInPage user = new SignInPage(driver);
        HomePage home = user.sign("hunan");
        home.addPost("");
        Assert.assertFalse(home.getPost().contains(""));

    }

}
