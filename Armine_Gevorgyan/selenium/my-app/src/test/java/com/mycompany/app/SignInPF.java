package com.mycompany.app;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class SignIn  {


    private WebDriver driver;

    public SignIn(WebDriver driver){

        this.driver = driver;

        //This initElements method will create all WebElements

        PageFactory.initElements(driver, this);

    }
    
    @FindBy(xpath="//*[@id=\"email\"]")
    WebElement email;

    @FindBy(xpath="//*[@id=\"password\"]")
    WebElement password;

    @FindBy(xpath="//*[@id=\\\"root\\\"]/div/div/div/form/div/div[3]/div[1]/button")
    WebElement signInBtn;

    @FindBy(xpath="//*[@id=\"root\"]/div/div/div/form/div/div[2]/input")
    WebElement remember;
    

    public void goToPage(WebDriver driver){
        driver.get("http://localhost:3000/");
    }

    public String getEmailValue() {
        return email.getText();
    }

    public String getPasswordValue() {
        return password.getText();

    }

    public void writeEmail() {
        System.out.println(email);
        email.sendKeys("arm.gevorgyan94@gmail.com");
        System.out.println(email.getText());
    }

    public void writeEmpatyEmail() {
        email.sendKeys("");
    }

    public void writeUnSigninEmail() {
        email.sendKeys("test.test@inbox.ru");
    }

    public void writeFeildEmail() {
        email.sendKeys("test.test");
    }

    public void writeEmpatyPassword() {
        password.sendKeys("");
    }

    public void writePassword() {
        password.sendKeys("ca6d691d-34ca-4f4e-a395-5aa738e05ce7");
    }

    public void writeFeildPassword() {
        password.sendKeys("ca");
    }

    public void signIn() {
        signInBtn.click();
    }

    public void rememberMe() {
        remember.click();
    }
}
