import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class FirstPage extends WebDriverSetUp {
    @FindBy(id = "username")
    WebElement username;
    @FindBy(xpath = "/html/body/form/div/input[2]")
    WebElement join;


    public void goToPage(WebDriver driver){
        driver.get("http://localhost:4000/");
    }

    public String getTitle(WebDriver driver){
        return driver.getTitle();
    }

    public void goToChat(){
        join.click();
    }
    public void writeName( String name){

        username.sendKeys(name);
    }

}
