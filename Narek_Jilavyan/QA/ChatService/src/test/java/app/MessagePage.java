package app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class MessagePage {

    private WebDriver driver;

    public  static final String privateTextXpath = "/html/body/div/div/div[3]/div[2]/div/button";
    public  static final String publicTextXpath = "/html/body/div/div/div[3]/div[3]/div/button";

    @FindBy(how= How.ID, id="privateText")
    WebElement privateTextArea;
    @FindBy(xpath = privateTextXpath)
    WebElement privateText;
    @FindBy(how= How.ID, id="messages")
    WebElement message;
    @FindBy(how= How.ID, id="publicText")
    WebElement publicTextArea;
    @FindBy(xpath = publicTextXpath)
    WebElement publicText;
    @FindBy(how= How.ID, id="publicMessages")
    WebElement publicMessage;


    public MessagePage(WebDriver driver) throws InterruptedException {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public String getFriendName(String name) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id(name)));
        return driver.findElement(By.id(name)).getText();
    }

    public void sendMessage(String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("privateText")));
        privateTextArea.sendKeys(message);
        privateText.click();
    }

    public void sendMessageFrom(String user, String message) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));
        driver.findElement(By.id(user)).click();
        sendMessage(message);
    }

    public String getMessage(String user) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("friends")));
        driver.findElement(By.id(user)).click();
        List<WebElement> links = message.findElements(By.tagName("li"));
        return links.get(links.size()-1).getText();
    }

    public  void  addPost (String post) {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("publicText")));
        publicTextArea.sendKeys(post);
        publicText.click();
    }

    public String getPost() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("publicMessages")));
        List<WebElement> links = publicMessage.findElements(By.tagName("li"));
        return links.get(links.size()-1).getText();
    }

    public String getTitle() {
        return driver.getTitle();
    }
}
