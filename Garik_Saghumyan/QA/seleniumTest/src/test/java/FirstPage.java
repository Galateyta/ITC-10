import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class FirstPage extends WebDriverSetUp {

    By username =  By.id("username");
    By join = By.xpath("/html/body/form/div/input[2]");


    public void goToPage(WebDriver driver){
        driver.get("http://localhost:4000/");
    }

    public String getTitle(WebDriver driver){
        return driver.getTitle();
    }

    public void goToChat(WebDriver driver){
        WebElement joinbutton = driver.findElement(join);
        joinbutton.click();
    }
    public void writeName(WebDriver driver, String name){
        WebElement input = driver.findElement(username);
        input.sendKeys(name);
    }

}
