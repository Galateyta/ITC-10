
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.*;


public class SeleniumTest extends WebDriverSetUp{

    @Test
    public void checkTitle(){
        driver.get("http://localhost:4000/");
        String title = driver.getTitle();
        Assert.assertEquals(title, "Socket.io Chat", "cheking page title failed");
    }
    @Test
    public void goToChatWithName() {
        driver.get("http://localhost:4000/");
        WebElement input = driver.findElement(By.id("username"));
        input.sendKeys("Garik");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        Assert.assertTrue(true, "goToChatWithName function failed");
    }

    @Test
    public void goToHomePageWithoutName() {
        driver.get("http://localhost:4000/");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        String className = driver.findElement(By.xpath("/html/body/div")).getAttribute("class");
        Assert.assertEquals(className,"chat-form", "goToChatWithoutName function failed");
    }
    @Test
    public void gotoChatAndCheckFriends(){
        driver.get("http://localhost:4000/");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        String friends = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/h3")).getText();
        Assert.assertEquals(friends, "Friends", "gotoChatAndCheckFriends function failed");
    }
    @Test
    public void gotoChatAndCheckPotss(){
        driver.get("http://localhost:4000/");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        String posts = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[3]/h3")).getText();
        Assert.assertEquals(posts, "Posts", "gotoChatAndCheckFriends function failed");
    }
    @Test
    public void gotoChatAndCheckName(){
        driver.get("http://localhost:4000/");
        WebElement input = driver.findElement(By.id("username"));
        input.sendKeys("Garik");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        String name = driver.findElement(By.id("uName")).getText();
        Assert.assertEquals(name, "Garik", "gotoChatAndCheckName function failed");
    }

    @Test
    public void goToChatAngSendMessage(){
        driver.get("http://localhost:4000/");
        WebElement input = driver.findElement(By.id("username"));
        input.sendKeys("Garik");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        WebElement text = driver.findElement(By.id("textarea"));
        text.sendKeys("Hello");
        WebElement send = driver.findElement((By.xpath("/html/body/div/div/div[3]/div[2]/div/button")));
        send.click();
        String message = driver.findElement((By.xpath("//*[@id=\"messages\"]/li"))).getText();
        Assert.assertEquals(message, "Garik: Hello", "goToChatAngSendMessage function failed");
    }
    @Test
    public void goToChatAndAddPost(){
        driver.get("http://localhost:4000/");
        WebElement input = driver.findElement(By.id("username"));
        input.sendKeys("Garik");
        WebElement join = driver.findElement(By.xpath("/html/body/form/div/input[2]"));
        join.click();
        WebElement text = driver.findElement(By.id("publicText"));
        text.sendKeys("My current post");
        WebElement send = driver.findElement((By.xpath("/html/body/div/div/div[3]/div[3]/div/button")));
        send.click();
        String id = driver.findElement((By.xpath("//*[@id=\"publicMessages\"]"))).getAttribute("id");
        String expected = "publicMessages";
        Assert.assertEquals(id, expected, "goToChatAndAddPost function failed");
    }

}
