package app;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

public class LogIn{
    private WebDriver driver;

    public  static final String logInButtonXpath = "/html/body/form/div/input[2]";

    @FindBy(how= How.ID, id = "username")
    WebElement usernameField;
    @FindBy(xpath = logInButtonXpath)
    WebElement logInButton;

    public LogIn(ChromeDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public MessagePage sign(String name) throws InterruptedException {
        usernameField.sendKeys(name);
        logInButton.click();
        return new MessagePage(driver);
    }
}
