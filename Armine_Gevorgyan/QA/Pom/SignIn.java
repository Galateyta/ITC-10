import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class SignIn extends WebDriverSetUp {

    By email = By.xpath("//*[@id=\"email\"]");
    By password = By.xpath("//*[@id=\"password\"]");
    By signInBtn = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[3]/div[1]/button");
    By remember = By.xpath("//*[@id=\"root\"]/div/div/div/form/div/div[2]/input");


    public void goToPage(WebDriver driver){
        driver.get("http://localhost:3000/");
    }

    public String getEmailValue(WebDriver driver) {
        return driver.findElement(email).getText();
    }

    public String getPasswordValue(WebDriver driver) {
        return driver.findElement(password).getText();
    }

    public void writeEmail(WebDriver driver) {
        WebElement text = driver.findElement(email);
        text.sendKeys("arm.gevorgyan@inbox.ru");
    }

    public void writePassword(WebDriver driver) {
        WebElement text = driver.findElement(password);
        text.sendKeys("Test.1994");
    }

    public void signIn(WebDriver driver) {
        WebElement write = driver.findElement(signInBtn);
        write.click();
    }

    public void rememberMe(WebDriver driver) {
        WebElement write = driver.findElement(remember);
        write.click();
    }
}
