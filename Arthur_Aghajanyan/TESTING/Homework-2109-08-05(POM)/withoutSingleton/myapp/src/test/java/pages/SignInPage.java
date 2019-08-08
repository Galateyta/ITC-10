package pages;
import constants.SignInConstant;
import helperFunctions.HelperFunctions;
import org.openqa.selenium.By;
import tests.*;


import org.openqa.selenium.WebElement;

public class SignInPage {
    private  WebElement signInText;
    private WebElement forgotPasswordButton;
    private WebElement password;
    private static SignInPage pageInstance;

    public SignInPage(){
        forgotPasswordButton = BasePage.driver.findElement(By.xpath(SignInConstant.forgotPasswordButton));
        signInText = BasePage.driver.findElement(By.xpath(SignInConstant.signInText));
        password = BasePage.driver.findElement(By.id(SignInConstant.password));

    }

    //Conflict using singleton pattern
    public static SignInPage getInstance() {
//        HelperFunctions.sleepSpecificTime(2);
        HelperFunctions.waitToElement(BasePage.driver, 7, SignInConstant.signInText);
//        if (pageInstance == null) {
//            pageInstance = new SignInPage();
//        }
//        return pageInstance;
        return pageInstance = new SignInPage();

    }

    public WebElement getSignInText() {
        return signInText;
    }

    public void setSignInText(WebElement signInText) {
        this.signInText = signInText;
    }

    public WebElement getForgotPasswordButton() {
        return forgotPasswordButton;
    }

    public void setForgotPasswordButton(WebElement forgotPasswordButton) {
        this.forgotPasswordButton = forgotPasswordButton;
    }

    public WebElement getPassword() {
        return password;
    }

    public void setPassword(WebElement password) {
        this.password = password;
    }

    public ForgotPasswordPage clickForgotPasswordButton(){
        forgotPasswordButton.click();
        return ForgotPasswordPage.getInstance();
    }
}
